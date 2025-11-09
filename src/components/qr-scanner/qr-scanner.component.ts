import { Component, ChangeDetectionStrategy, output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

declare var Html5Qrcode: any;

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrScannerComponent implements AfterViewInit {
  scanSuccess = output<string>();
  scanError = output<string>();
  close = output<void>();

  @ViewChild('reader') readerElement!: ElementRef;

  private html5QrCode: any;

  ngAfterViewInit() {
    this.html5QrCode = new Html5Qrcode(this.readerElement.nativeElement.id);
    this.startScanning();
  }

  startScanning() {
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };
    
    this.html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText: string, decodedResult: any) => {
          this.onScanSuccess(decodedText);
        },
        (errorMessage: string) => {
          // parse error, ignore.
        })
      .catch((err: any) => {
        this.onScanError(err);
      });
  }

  onScanSuccess(decodedText: string) {
    this.stopScanning();
    this.scanSuccess.emit(decodedText);
  }

  onScanError(error: any) {
    this.stopScanning();
    this.scanError.emit('Falló el escaneo del código QR. Por favor, intente de nuevo.');
  }

  onClose() {
    this.stopScanning();
    this.close.emit();
  }

  private stopScanning() {
    if (this.html5QrCode && this.html5QrCode.isScanning) {
      this.html5QrCode.stop().catch((err: any) => console.error("Failed to stop scanner", err));
    }
  }

  ngOnDestroy() {
    this.stopScanning();
  }
}