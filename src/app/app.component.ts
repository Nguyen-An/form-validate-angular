import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ValidatorService } from './service/validator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('formRef', { static: true }) formRef: ElementRef;
  @ViewChild('passwordRef', { static: true }) passwordRef: ElementRef;

  constructor(private validatorService: ValidatorService, private elRef: ElementRef) {
    this.formRef = elRef.nativeElement;
    this.passwordRef = elRef.nativeElement;
   }

  ngAfterContentInit() {
    let Validator = this.validatorService

    // Đối với trường hợp confirmed lấy HTML element của thẻ cần confirm
    let passwordRefElement = this.passwordRef.nativeElement
    
    Validator.initValidator({
      form: this.formRef.nativeElement,
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#fullname', 'Vui lòng nhập vào tên đầy đủ của bạn'),
        Validator.isRequired('#email'),
        Validator.isRequired('#file'),
        Validator.isRequired('#password'),
        Validator.isRequired('#password_confirmation'),
        Validator.isRequired('input[name="gender"]'),
        Validator.isRequired('#province'),
        Validator.isEmail('#email'),
        Validator.minLength('#password', 6),
        Validator.isConfirmed('#password_confirmation', passwordRefElement , 'Mật khẩu nhập lại không chính xác')
      ],
      onSubmit: (data: any) => {
        // Xử lý dữ liệu khi form được submit(CALL API)
        console.log(data);
      }
    });
  }

  afterViewChecked() {
    
  }

  ngOnInit(): void {
    console.log();
    
  }
}
