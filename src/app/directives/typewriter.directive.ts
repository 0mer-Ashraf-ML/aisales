import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appTypewriter]',
  standalone: true,
})
export class TypewriterDirective implements AfterViewInit {
  @Input('appTypewriter') text1: string = '';
  @Input() text2?: string;
  @Input() line1Class?: string;
  @Input() line2Class?: string;

  private baseSpeed = 100;
  private interAnimationDelay = 300;
  private hasAnimated = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.setupObserver();
  }

  private setupObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.hasAnimated) {
            this.hasAnimated = true;
            observer.unobserve(entry.target);
            this.animateBothTexts(this.el.nativeElement);
          }
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(this.el.nativeElement);
  }

  private animateBothTexts(container: HTMLElement) {
    container.innerHTML = '';

    const line1 = this.renderer.createElement('div');
    const line2 = this.text2 ? this.renderer.createElement('div') : null;

    if (this.line1Class) {
      this.line1Class.split(' ').forEach((cls) =>
        this.renderer.addClass(line1, cls)
      );
    }

    if (line2 && this.line2Class) {
      this.line2Class.split(' ').forEach((cls) =>
        this.renderer.addClass(line2, cls)
      );
    }

    this.renderer.appendChild(container, line1);
    if (line2) this.renderer.appendChild(container, line2);

    this.prepareWords(line1, this.text1);
    if (line2 && this.text2) {
      this.prepareWords(line2, this.text2);
    }

    this.animateWords(line1, () => {
      if (line2 && this.text2) {
        setTimeout(() => this.animateWords(line2!), this.interAnimationDelay);
      }
    });
  }

  private prepareWords(container: HTMLElement, text: string) {
    container.innerHTML = '';
    const words = text.split(' ');
  
    words.forEach((word, i) => {
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span, 'word');
  
      // Initial styles
      this.renderer.setStyle(span, 'opacity', '0');
      this.renderer.setStyle(span, 'transform', 'translateY(10px)');
      this.renderer.setStyle(span, 'display', 'inline-block');
      this.renderer.setStyle(span, 'marginRight', '0.5rem');
  
      // Smooth wave-like transition per word
      const delay = `${i * 100}ms`;
      this.renderer.setStyle(
        span,
        'transition',
        `opacity 0.6s cubic-bezier(0.19, 1, 0.22, 1) ${delay}, transform 0.6s cubic-bezier(0.19, 1, 0.22, 1) ${delay}`
      );
  
      this.renderer.setProperty(span, 'textContent', word);
      this.renderer.appendChild(container, span);
    });
  }

  private animateWords(container: HTMLElement, onComplete?: () => void) {
    const words = Array.from(container.querySelectorAll('.word')) as HTMLElement[];
    let index = 0;

    const animateWord = () => {
      if (index < words.length) {
        this.renderer.setStyle(words[index], 'opacity', '1');
        this.renderer.setStyle(words[index], 'transform', 'translateY(0)');
        index++;
        setTimeout(animateWord, this.baseSpeed);
      } else if (onComplete) {
        onComplete();
      }
    };

    setTimeout(animateWord, 100);
  }
}
