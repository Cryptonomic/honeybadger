import Foundation
import BeaconSDK

@objc(BeaconBridge)
class BeaconBridge: NSObject, RCTBridgeModule {
  private static let exampleTezosPublicKey = "edpktpzo8UZieYaJZgCHP6M6hKHPdWBSNqxvmEt6dwWRgxDh1EAFw9"

  static func moduleName() -> String! {
    return "BeaconBridge";
  }

  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @Published private(set) var beaconRequest: String? = nil
  private var awaitingRequest: Beacon.Request? = nil

  private var beaconClient: Beacon.Client?
  private var onMessage: RCTResponseSenderBlock?

  @objc
  func startBeacon(_ onMessage: @escaping RCTResponseSenderBlock) {
    Beacon.Client.create(with: Beacon.Client.Configuration(name: "Galleon Mobile")) { result in
      switch result {
      case let .success(client):
          self.beaconClient = client
          self.listenForRequests()
          self.onMessage = onMessage
      case let .failure(error):
          print("Could not create Beacon client, got error: \(error)")
      }
    }
  }

  @objc
  func addPeer(_ peerId: String, name: String, publicKey: String, relayServer: String, version: String) {
      print("addPeer", name)
    var peer: Beacon.P2PPeer {
      Beacon.P2PPeer(id: peerId, name: name, publicKey: publicKey, relayServer: relayServer, version: version)
    }

    self.beaconClient?.add([.p2p(peer)]) { result in
      switch result {
        case .success(_):
          print("Peer added")
        case let .failure(error):
          print("Could not add the peer, got error: \(error)")
      }
    }
  }

  @objc
  func sendResponse() {
    guard let request = awaitingRequest else {
        return
    }
    
    beaconRequest = nil
    awaitingRequest = nil
    
    switch request {
    case let .permission(permission):
        let response = Beacon.Response.Permission(from: permission, publicKey: BeaconBridge.exampleTezosPublicKey)
        beaconClient?.respond(with: .permission(response)) { result in
            switch result {
            case .success(_):
                print("Sent the response")
            case let .failure(error):
                print("Failed to send the response, got error: \(error)")
            }
        }
    default:
        // TODO
        return
    }
  }

  private func listenForRequests() {
    beaconClient?.connect { result in
        switch result {
        case .success(_):
            self.beaconClient?.listen(onRequest: self.onBeaconRequest)
        case let .failure(error):
            print("Error while connecting for messages \(error)")
        }
    }
  }

  private func onBeaconRequest(result: Result<Beacon.Request, Beacon.Error>) {
    switch result {
      case let .success(request):
        let encoder = JSONEncoder()
        encoder.outputFormatting = .prettyPrinted
        
        let data = try? encoder.encode(request)

        print("onBeaconRequest")
        print(data.flatMap { String(data: $0, encoding: .utf8) })
        onMessage?([data.flatMap { String(data: $0, encoding: .utf8) }])
      case let .failure(error):
          print("Error while processing incoming messages: \(error)")
          break
      }
    }
  }

extension Beacon.Request: Encodable {
    public func encode(to encoder: Encoder) throws {
        switch self {
        case let .permission(content):
            try content.encode(to: encoder)
        case let .operation(content):
            try content.encode(to: encoder)
        case let .signPayload(content):
            try content.encode(to: encoder)
        case let .broadcast(content):
            try content.encode(to: encoder)
        }
    }
}
