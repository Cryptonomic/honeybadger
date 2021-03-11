 import Foundation
 import BeaconSDK

 @objc(BeaconBridge)
 class BeaconBridge: RCTEventEmitter {
    private var awaitingRequest: Beacon.Request? = nil
    @Published private(set) var beaconRequest: String? = nil


    override static func moduleName() -> String! {
      return "BeaconBridge";
    }

    override static func requiresMainQueueSetup() -> Bool {
      return true
    }

    override func supportedEvents() -> [String]! {
        return ["onMessage", "onError", "onSuccess"]
      }

    private var beaconClient: Beacon.Client?

    @objc
    func startBeacon() {
      Beacon.Client.create(with: Beacon.Client.Configuration(name: "Galleon Mobile")) { result in
        switch result {
          case let .success(client):
            self.beaconClient = client
            self.listenForRequests()
            print("-Start-Beacon-Success-", client)
          case let .failure(error):
            print("Could not create Beacon client, got error: \(error)")
//            self.sendEvent(withName: "onError", body: ["Could not create Beacon client, got error: \(error)"])
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
          self.sendEvent(withName: "onError", body: ["ADD_PEER_ERROR", "Could not add the peer, got error: \(error)"])
        }
      }
    }
  
    @objc
    func getPeers() {
      self.beaconClient?.getPeers() { result in
        switch result {
          case .success(_):
            print("Get Peers Success")
            self.sendEvent(withName: "onSuccess", body: ["type": "get_peers", "data": result])
          case let .failure(error):
            print("Could not get peers, got error: \(error)")
        }
      }
    }
  
    @objc
    func getPermissions() {
      self.beaconClient?.getPermissions() { result in
        switch result {
          case .success(_):
            print("Get Permissions Success")
            self.sendEvent(withName: "onSuccess", body: ["type": "get_permissions", "data": result])
          case let .failure(error):
            print("Could not get permissions, got error: \(error)")
        }
      }
    }
  
    @objc
    func removePermissions() {
      self.beaconClient?.removeAllPermissions() { result in
        switch result {
          case .success(_):
            print("Remove Permissions Success")
          case let .failure(error):
            print("Could not remove permissions, got error: \(error)")
        }
      }
    }
  
    @objc
    func removePeers() {
      self.beaconClient?.removeAllPeers() { result in
        switch result {
          case .success(_):
            print("Remove Peers Success")
          case let .failure(error):
            print("Could not remove peers, got error: \(error)")
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
          let response = Beacon.Response.Permission(from: permission, publicKey: payload)
            beaconClient?.respond(with: .permission(response)) { result in
                switch result {
                case .success(_):
                    print("Sent the response")
                  self.sendEvent(withName: "onSuccess", body: ["type": "permission_success"])
                case let .failure(error):
                    print("Failed to send the response, got error: \(error)")
                    self.sendEvent(withName: "onError", body: ["Failed to send the response, got error: \(error)"])
                }
            }
          break
        case let .operation(operation):
  //        let response = Beacon.Response.Operation(from: operation, transactionHash: payload)
  //        print(response)
          // TODO
          break
        case let .signPayload(signPayload):
  //        let response = Beacon.Response.SignPayload(from: signPayload, signature: payload)
  //        print(response)
          // TODO
          break
        case let .broadcast(broadcast):
  //        let response = Beacon.Response.Broadcast(from: broadcast, transactionHash: payload)
  //        print(response)
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
              self.sendEvent(withName: "onMessage", body: [data.flatMap { String(data: $0, encoding: .utf8) } as Any])
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
