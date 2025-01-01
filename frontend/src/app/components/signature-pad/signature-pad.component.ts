import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-signature-pad',
  imports: [],
  templateUrl: './signature-pad.component.html',
  styleUrl: './signature-pad.component.css',
})
export class SignaturePadComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  private signaturePad!: SignaturePad;

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    this.signaturePad = new SignaturePad(canvas);
    this.resizeCanvas();
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext('2d')?.scale(ratio, ratio);
  }

  clear() {
    this.signaturePad.clear();
  }
  @Output() onSaveSignature = new EventEmitter<string>();
  save() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature.');
      return;
    }
    const dataUrl = this.signaturePad.toDataURL();
    this.onSaveSignature.emit(dataUrl);
  }
}
