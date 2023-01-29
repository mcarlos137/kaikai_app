/* global __example_plugin __example_plugin_swift */
import { runOnJS } from 'react-native-reanimated';
import type { Frame } from 'react-native-vision-camera';
import { useScanBarcodes, BarcodeFormat, scanBarcodes, Barcode } from 'vision-camera-code-scanner';

declare let _WORKLET: true | undefined;

export function codeScannerQRPlugin(frame: Frame): void {
  'worklet';
  //const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
  /*runOnJS
    ((detectedBarcodes: Barcode[]) => {
      console.log('detectedBarcodes', detectedBarcodes)
    })
    (detectedBarcodes);*/
}
