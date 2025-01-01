import { Component, OnInit } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { SearchByQrCodeModalService } from '../../../services/search-by-qr-code-modal.service';
import { CommonModule } from '@angular/common';
import { fadeInOut } from '../../../animations/animations';
@Component({
  selector: 'app-search-by-qr-code-modal',
  imports: [ZXingScannerModule, CommonModule],
  templateUrl: './search-by-qr-code-modal.component.html',
  styleUrl: './search-by-qr-code-modal.component.css',
  animations: [fadeInOut],
})
export class SearchByQrCodeModalComponent implements OnInit {
  isOpen = false;
  constructor(private searchByQrCodeModalService: SearchByQrCodeModalService) {}
  ngOnInit(): void {
    this.searchByQrCodeModalService.isSearchByQrCodeModalOpen$.subscribe(
      (isOpen) => {
        this.isOpen = isOpen;
      }
    );
  }
  allowedFormats = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.EAN_13,
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
  ];
  scanResult: string = '';
  onCodeResult(result: string) {
    this.scanResult = result;
  }
  onError(error: Error) {
    alert(error.message);
  }
  closeModal() {
    this.searchByQrCodeModalService.closeModal();
  }
}
