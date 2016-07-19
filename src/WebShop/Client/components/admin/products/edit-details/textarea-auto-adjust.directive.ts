import { ElementRef, HostListener, Directive} from '@angular/core';

@Directive({
  selector: 'textarea[auto-adjust]'
})
export class AutoAdjustTextareaDirective {
  @HostListener('input',['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }
  constructor(public element: ElementRef){
  }

  ngOnInit(): void{
    this.adjust();
  }

  private adjust(): void{
    this.element.nativeElement.style.overflow = 'hidden';
    this.element.nativeElement.style.height = 'auto';
    this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
  }
}