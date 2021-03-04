import Foundation
import BeaconSDK

@objc(BeaconBridge)
class BeaconBridge: NSObject, RCTBridgeModule {
  private static let exampleTezosPublicKey = "edpktpzo8UZieYaJZgCHP6M6hKHPdWBSNqxvmEt6dwWRgxDh1EAFw9"
  private var awaitingRequest: Beacon.Request? = nil
  @Published private(set) var beaconRequest: String? = nil


  static func moduleName() -> String! {
    return "BeaconBridge";
  }

  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  private var beaconClient: Beacon.Client?
  private var onMessage: RCTResponseSenderBlock?
  private var onError: RCTResponseSenderBlock?

  @objc
  func startBeacon(_ onMessage: @escaping RCTResponseSenderBlock, onError: @escaping RCTResponseSenderBlock) {
    Beacon.Client.create(with: Beacon.Client.Configuration(name: "Galleon Mobile")) { result in
      switch result {
        case let .success(client):
          self.beaconClient = client
          self.listenForRequests()
          self.onMessage = onMessage
          self.onError = onError
          print("-Start-Beacon-Success-", client)
        case let .failure(error):
          print("Could not create Beacon client, got error: \(error)")
          self.onError?(["CREATE_BEACON_CLIENT_ERROR"])
      }
    }
  }

  @objc
  func addPeer(_ peerId: String, name: String, publicKey: String, relayServer: String, version: String) {
    var peer: Beacon.P2PPeer {
      Beacon.P2PPeer(id: peerId, name: name, publicKey: publicKey, relayServer: relayServer, version: version)
    }
    self.beaconClient?.add([.p2p(peer)]) { result in
      switch result {
        case .success(_):
          print("Peer added")
        case let .failure(error):
          print("Could not add the peer, got error: \(error)")
          self.onError?(["ADD_PEER_ERROR"])
      }
    }
  }

  @objc
  func sendResponse(_ payload: String) {
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
        break
      case let .operation(operation):
        let response = Beacon.Response.Operation(from: operation, transactionHash: payload)
        print(response)
        // TODO
        break
      case let .signPayload(signPayload):
        let response = Beacon.Response.SignPayload(from: signPayload, signature: payload)
        print(response)
        // TODO
        break
      case let .broadcast(broadcast):
        let response = Beacon.Response.Broadcast(from: broadcast, transactionHash: payload)
        print(response)
        // TODO
        break
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
        
        DispatchQueue.main.async {
            self.beaconRequest = data.flatMap { String(data: $0, encoding: .utf8) }
            self.awaitingRequest = request
            self.onMessage?([data.flatMap { String(data: $0, encoding: .utf8) } as Any])
        }
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
