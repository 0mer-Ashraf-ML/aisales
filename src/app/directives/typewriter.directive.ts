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

  private baseSpeed = 35;
  private interAnimationDelay = 120;
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

    this.prepareText(line1, this.text1);

    if (line2 && this.text2) {
      this.prepareText(line2, this.text2);
    }

    this.animateText(line1, () => {
      if (line2 && this.text2) {
        setTimeout(() => this.animateText(line2!), this.interAnimationDelay);
      }
    });
  }

  private prepareText(container: HTMLElement, text: string) {
    container.innerHTML = '';
    for (const char of text) {
      const span = this.renderer.createElement('span');
      this.renderer.addClass(span, 'char');
      this.renderer.setStyle(span, 'opacity', '0');
      this.renderer.setStyle(span, 'display', 'inline-block');
      this.renderer.setProperty(span, 'textContent', char === ' ' ? '\u00A0' : char);
      this.renderer.appendChild(container, span);
    }
  }

  private animateText(container: HTMLElement, onComplete?: () => void) {
    const chars = Array.from(container.querySelectorAll('.char'));
    let index = 0;

    const animateChar = () => {
      if (index < chars.length) {
        const speed = this.baseSpeed * (0.8 + Math.random() * 0.4);
        this.renderer.setStyle(chars[index], 'opacity', '1');
        this.renderer.setStyle(chars[index], 'transform', 'translateY(0)');
        index++;
        setTimeout(animateChar, speed);
      } else if (onComplete) {
        onComplete();
      }
    };

    setTimeout(animateChar, 50);
  }
}
