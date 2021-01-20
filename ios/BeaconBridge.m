#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(BeaconBridge, NSObject)
RCT_EXTERN_METHOD(startBeacon:(RCTResponseSenderBlock)onMessage)
RCT_EXTERN_METHOD(addPeer:(NSString *)peerId name:(NSString *)name publicKey:(NSString *)publicKey relayServer:(NSString *)relayServer version:(NSString *)version)
RCT_EXTERN_METHOD(sendResponse)
@end
