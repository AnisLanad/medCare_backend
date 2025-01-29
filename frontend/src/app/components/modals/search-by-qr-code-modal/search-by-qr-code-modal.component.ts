import { Component, OnInit } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { SearchByQrCodeModalService } from '../../../services/search-by-qr-code-modal.service';
import { CommonModule } from '@angular/common';
import { fadeInOut } from '../../../animations/animations';
import { SearchByNssService } from '../../../services/searchByNss/search-by-nss.service';
import { Tpatient } from '../../../types/patient.type';
import { Perform } from '../../../utils/Perform';
import { SearchedPatientService } from '../../../services/SearchedPatient/searched-patient.service';
import { PatientModalService } from '../../../services/patient-modal.service';
import { SummaryService } from '../../../services/summaryService/summary.service';
import { AssessmentService } from '../../../services/AssessmentService/assessment.service';
import { PrescriptionService } from '@app/services/Prescription/prescription.service';
import { Tsummary } from '@app/types/summary.type';
import { Tassessment } from '@app/types/assessment.type';
import { Tprescription } from '@app/types/prescription.type';
@Component({
  selector: 'app-search-by-qr-code-modal',
  imports: [ZXingScannerModule, CommonModule],
  templateUrl: './search-by-qr-code-modal.component.html',
  styleUrl: './search-by-qr-code-modal.component.css',
  animations: [fadeInOut],
})
export class SearchByQrCodeModalComponent implements OnInit {
  isOpen = false;
  constructor(
    private searchByQrCodeModalService: SearchByQrCodeModalService,
    private searchByNssService: SearchByNssService,
    private searchedPatientService: SearchedPatientService,
    private patientModalService: PatientModalService,
    private summaryService: SummaryService,
    private assessmentService: AssessmentService,
    private prescriptionService: PrescriptionService
  ) {}
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
  searchData = new Perform<Tpatient[]>();
  onCodeResult(result: string) {
    this.scanResult = result;
    this.searchData.load(
      this.searchByNssService.searchByNss(result),
      (data: Tpatient[]) => {
        if (data.length > 0) {
          this.searchedPatientService.setSearchedPatient(data[0]);
          this.summaryService
            .getPatientSummaries(data[0].DPI_ID)
            .subscribe((data) => {
              this.searchedPatientService.setPatientSummary(data as Tsummary[]);
            });
          this.assessmentService
            .getPatientAssessments(data[0].DPI_ID)
            .subscribe((data) => {
              this.searchedPatientService.setPatientAssessments(
                data as Tassessment[]
              );
            });
          this.prescriptionService
            .getPatientPrescriptions(data[0].DPI_ID)
            .subscribe((data) => {
              this.searchedPatientService.setPatientPrescriptions(
                data as Tprescription[]
              );
            });
          this.patientModalService.openModal();
        } else {
          console.log('no patient found');
        }
      }
    );
  }
  onError(error: Error) {
    alert(error.message);
  }
  closeModal() {
    this.searchByQrCodeModalService.closeModal();
  }
}
