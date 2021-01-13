#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(BeaconBridge, NSObject)
RCT_EXTERN_METHOD(startBeacon)
RCT_EXTERN_METHOD(sendResponse)
@end

