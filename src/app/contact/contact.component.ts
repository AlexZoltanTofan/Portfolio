import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  @ViewChild('myForm') myForm!: ElementRef;
  @ViewChild('nameField') nameField!: ElementRef;
  @ViewChild('emailField') emailField!: ElementRef;
  @ViewChild('messageField') messageField!: ElementRef;
  @ViewChild('sendButton') sendButton!: ElementRef;

  isNameEmpty: boolean = false;
  isEmailEmpty: boolean = false;
  isMessageEmpty: boolean = false;

  isSending: boolean = false;
  messageSent: boolean = false;

  constructor() {}
  ngOnInit(): void {}

  async sendMail() {
    if (
      !this.nameField.nativeElement.value ||
      !this.emailField.nativeElement.value ||
      !this.messageField.nativeElement.value ||
      !this.validateEmail(this.emailField.nativeElement.value)
    ) {
      return;
    }

    this.isSending = true;
    let nameField = this.nameField.nativeElement;
    let emailField = this.emailField.nativeElement;
    let messageField = this.messageField.nativeElement;
    let sendButton = this.sendButton.nativeElement;

    //senden
    nameField.disabled = true;
    emailField.disabled = true;
    messageField.disabled = true;
    sendButton.disabled = true;

    nameField.classList.add('sent-animation');
    emailField.classList.add('sent-animation');
    messageField.classList.add('sent-animation');
    sendButton.classList.add('sent-animation');

    let fd = new FormData();
    fd.append('name', nameField.value);
    fd.append('email', emailField.value);
    fd.append('message', messageField.value);

    await fetch('https://alex-tofan.com/send_mail/send_mail/send_mail.php', {
      method: 'POST',
      body: fd,
    });

    this.isSending = false;
    this.messageSent = true;

    this.nameField.nativeElement.value = '';
    this.emailField.nativeElement.value = '';
    this.messageField.nativeElement.value = '';

    nameField.disabled = false;
    emailField.disabled = false;
    messageField.disabled = false;
    sendButton.disabled = true;

    setTimeout(() => {
      this.messageSent = false;
      sendButton.disabled = false;
    }, 1000);

    nameField.classList.remove('sent-animation');
    emailField.classList.remove('sent-animation');
    messageField.classList.remove('sent-animation');
    sendButton.classList.remove('sent-animation');
  }

  validateEmail(email: string): boolean {
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailPattern.test(email);
  }
}
