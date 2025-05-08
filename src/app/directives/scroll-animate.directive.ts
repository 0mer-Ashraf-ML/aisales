import { Directive, ElementRef, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[slideUp]',
  standalone: true
})
export class SlideUpDirective implements OnInit, OnDestroy {
  private observer: IntersectionObserver | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.setupInitialStyles();
    this.setupIntersectionObserver();
  }

  private setupInitialStyles() {
    const element = this.el.nativeElement;
    // Add smooth transition properties
    this.renderer.setStyle(element, 'transition-property', 'transform, opacity');
    this.renderer.setStyle(element, 'transition-duration', '600ms');
    this.renderer.setStyle(element, 'transition-timing-function', 'cubic-bezier(0.16, 1, 0.3, 1)'); // Smooth ease-out
    this.renderer.setStyle(element, 'will-change', 'transform, opacity'); // Hint browser for optimization
    
    // Initial hidden state
    this.renderer.setStyle(element, 'opacity', '0');
    this.renderer.setStyle(element, 'transform', 'translateY(40px)'); // Reduced from 120px for smoother motion
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => {
            this.animateIn();
          });
          this.observer?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05, // More sensitive trigger
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element hits viewport
    });

    this.observer.observe(this.el.nativeElement);
  }

  private animateIn() {
    const element = this.el.nativeElement;
    // Use requestAnimationFrame for smoother animation start
    requestAnimationFrame(() => {
      this.renderer.setStyle(element, 'opacity', '1');
      this.renderer.setStyle(element, 'transform', 'translateY(0)');
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}