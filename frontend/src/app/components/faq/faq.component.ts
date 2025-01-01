import { Component } from '@angular/core';
import { FaqItemComponent } from '../faq-item/faq-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [FaqItemComponent, CommonModule],
  templateUrl: './faq.component.html',
})
export class FaqComponent {
  faqItems = [
    {
      question: 'What is MedCare?',
      answer:
        'MedCare is an online platform for doctors to provide medical services to patients.',
    },
    {
      question: 'How can I register as a doctor?',
      answer:
        'You can register as a doctor by clicking on the "Register as a doctor" button.',
    },
    {
      question: 'How can I book an appointment with a doctor?',
      answer:
        'You can book an appointment by clicking on the "Book an appointment" button.',
    },
    {
      question: 'How can I view my appointments?',
      answer:
        'You can view your appointments by clicking on the "My appointments" button.',
    },
    {
      question: 'How can I view my prescriptions?',
      answer:
        'You can view your prescriptions by clicking on the "My prescriptions" button.',
    },
    {
      question: 'How can I view my medical history?',
      answer:
        'You can view your medical history by clicking on the "My medical history" button.',
    },
    {
      question: 'How can I view my lab reports?',
      answer:
        'You can view your lab reports by clicking on the "My lab reports" button.',
    },
    {
      question: 'How can I view my radiology results?',
      answer:
        'You can view your radiology results by clicking on the "My radiology results" button.',
    },
  ];
  trackByFn(index: number, item: (typeof this.faqItems)[0]) {
    return item.question;
  }
}
