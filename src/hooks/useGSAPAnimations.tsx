/* eslint-disable @typescript-eslint/no-unused-vars */
/***************************************************
****************************************************/
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface SplitTextConstructor {
  new (
    element: Element | string,
    vars?: {
      type?: string;
      linesClass?: string;
      wordsClass?: string;
      charsClass?: string;
    }
  ): {
    chars: Element[];
    words: Element[];
    lines: Element[];
    split: (vars?: { type?: string }) => void;
  };
}

interface BreakpointConfig {
  scaleStart: number;
  xStart: number;
  yStart: number;
  scaleMiddle: number;
  xMiddle: number;
  yMiddle: number;
  scaleEnd: number;
  xEnd: number;
  yEnd: number;
}

interface Breakpoints {
  small: BreakpointConfig;
  large: BreakpointConfig;
}

interface AnimateItemsConfig {
  containerSelector: string;
  itemSelector: string;
  childCount: number;
  xOffset: number;
  opacity: number;
  duration: number;
  stagger: number;
  startTrigger: string;
  deviceWidthThreshold?: number;
}

interface ScrollAnimationConfig {
  triggerSelector: string;
  itemsSelector: string;
  scrollDuration?: number;
  deviceWidthThreshold?: number;
  xPercentMultiplier?: number;
  snapMultiplier?: number;
  num?: number;
}

declare global {
  interface Window {
    SplitText: SplitTextConstructor;
  }
}

const useGSAPAnimations = (): void => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // let smoother: ScrollSmoother | null = null;
    
    // Store cleanup functions
    const cleanupFunctions: (() => void)[] = [];

    const initializeGSAP = async () => {
      try {
        const { default: gsap } = await import("gsap");
        // const { default: ScrollSmoother } = await import("gsap/ScrollSmoother");
        const { default: ScrollToPlugin } = await import("gsap/ScrollToPlugin");
        const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
        const { default: SplitText } = await import("gsap/SplitText");

        await new Promise((resolve) => {
          if (document.readyState === "complete") {
            resolve(true);
          } else {
            window.addEventListener("load", () => resolve(true), {
              once: true,
            });
          }
        });

        gsap.registerPlugin(
          ScrollToPlugin,
          // ScrollSmoother,
          ScrollTrigger,
          SplitText
        );
        gsap.config({ nullTargetWarn: false });

        const deviceWidth: number = window.innerWidth;

        const initGSAP = (): void => {
          // const wrapper: HTMLElement | null =
          //   document.querySelector("#smooth-wrapper");
          // const content: HTMLElement | null =
          //   document.querySelector("#smooth-content");

          // if (!wrapper || !content) {
          //   return;
          // }

          ScrollTrigger.getAll().forEach((t: ScrollTrigger) => t.kill());
          gsap.killTweensOf("*");

          // if (deviceWidth > 767 && wrapper && content) {
          //   smoother = ScrollSmoother.create({
          //     wrapper: "#smooth-wrapper",
          //     content: "#smooth-content",
          //     smooth: 0.9,
          //     effects: deviceWidth < 1025 ? false : true,
          //     smoothTouch: 0.1,
          //     normalizeScroll: {
          //       allowNestedScroll: true,
          //     },
          //     ignoreMobileResize: true,
          //   });
          // }

          const initCustomCursor = (): void => {
            const cursor: HTMLElement | null =
              document.querySelector(".cursor");

            if (!cursor) {
              return;
            }
            const editCursor = (e: MouseEvent): void => {
              const { clientX: x, clientY: y } = e;
              cursor.style.left = x + "px";
              cursor.style.top = y + "px";
            };

            window.addEventListener("mousemove", editCursor);

            const interactiveElements: NodeListOf<Element> =
              document.querySelectorAll(
                "a, .cursor-pointer, button, [role='button']"
              );
            
            const mouseEnterHandler = (): void => {
              cursor.classList.add("cursor-active");
            };
            
            const mouseLeaveHandler = (): void => {
              cursor.classList.remove("cursor-active");
            };
            
            interactiveElements.forEach((item: Element) => {
              item.addEventListener("mouseenter", mouseEnterHandler);
              item.addEventListener("mouseleave", mouseLeaveHandler);
            });
            
            // Store cleanup function
            cleanupFunctions.push(() => {
              window.removeEventListener("mousemove", editCursor);
              interactiveElements.forEach((item: Element) => {
                item.removeEventListener("mouseenter", mouseEnterHandler);
                item.removeEventListener("mouseleave", mouseLeaveHandler);
              });
            });
          };

          const initImageMovement = (): void => {
            const imgMoveElements: NodeListOf<HTMLElement> =
              document.querySelectorAll(".img-move");

            if (imgMoveElements.length <= 0) {
              return;
            }

            if (imgMoveElements.length > 0) {
              const handlers: Map<HTMLElement, { mousemove: (e: MouseEvent) => void; mouseout: () => void }> = new Map();
              
              imgMoveElements.forEach((element: HTMLElement) => {
                element.style.transition = "transform .12s linear";

                const mouseMoveHandler = (event: MouseEvent): void => {
                  const rect: DOMRect = element.getBoundingClientRect();
                  const mousex: number =
                    event.pageX - rect.left - window.scrollX;
                  const mousey: number =
                    event.pageY - rect.top - window.scrollY;

                  const imgx: number = (mousex - 300) / 30;
                  const imgy: number = (mousey - 200) / 30;

                  element.style.transform = `translate(${imgx}px, ${imgy}px) scale(1.1)`;
                };
                
                const mouseOutHandler = (): void => {
                  element.style.transform = "translate(0px, 0px) scale(1)";
                };

                element.addEventListener("mousemove", mouseMoveHandler);
                element.addEventListener("mouseout", mouseOutHandler);
                
                handlers.set(element, { mousemove: mouseMoveHandler, mouseout: mouseOutHandler });
              });
              
              // Store cleanup function
              cleanupFunctions.push(() => {
                handlers.forEach((handlerSet, element) => {
                  element.removeEventListener("mousemove", handlerSet.mousemove);
                  element.removeEventListener("mouseout", handlerSet.mouseout);
                });
              });
            }
          };

          const initButtonHoverAnimation = (): void => {
            const btnHoverElements: NodeListOf<HTMLElement> =
              document.querySelectorAll(".btn-hover");

            if (btnHoverElements.length <= 0) {
              return;
            }

            const btnHandlers: Map<HTMLElement, { mouseenter: (e: MouseEvent) => void; mouseout: (e: MouseEvent) => void }> = new Map();

            btnHoverElements.forEach((btn: HTMLElement) => {
              const mouseEnterHandler = (e: MouseEvent): void => {
                const rect: DOMRect = btn.getBoundingClientRect();
                const x: number = e.pageX - rect.left - window.scrollX;
                const y: number = e.pageY - rect.top - window.scrollY;

                const span: HTMLElement | null = btn.querySelector("span");
                if (span) {
                  span.style.top = y + "px";
                  span.style.left = x + "px";
                }
              };

              const mouseOutHandler = (e: MouseEvent): void => {
                const rect: DOMRect = btn.getBoundingClientRect();
                const x: number = e.pageX - rect.left - window.scrollX;
                const y: number = e.pageY - rect.top - window.scrollY;

                const span: HTMLElement | null = btn.querySelector("span");
                if (span) {
                  span.style.top = y + "px";
                  span.style.left = x + "px";
                }
              };

              btn.addEventListener("mouseenter", mouseEnterHandler);
              btn.addEventListener("mouseout", mouseOutHandler);
              
              btnHandlers.set(btn, { mouseenter: mouseEnterHandler, mouseout: mouseOutHandler });
            });

            const allBtnElements: HTMLElement[] =
              gsap.utils.toArray(".btn-hover");
            const allBtnCircles: HTMLElement[] =
              gsap.utils.toArray(".btn-item");

            const parallaxHandlers: Map<HTMLElement, { mousemove: (e: MouseEvent) => void; mouseleave: () => void }> = new Map();

            if (allBtnElements.length > 0 && allBtnCircles.length > 0) {
              allBtnElements.forEach((btn: HTMLElement, i: number) => {
                const circle: HTMLElement = allBtnCircles[i];
                if (!circle) return;

                const parallaxIt = (
                  e: MouseEvent,
                  target: HTMLElement,
                  movement: number
                ): void => {
                  const rect: DOMRect = btn.getBoundingClientRect();
                  const relX: number = e.pageX - rect.left - window.scrollX;
                  const relY: number = e.pageY - rect.top - window.scrollY;

                  gsap.to(target, {
                    duration: 0.5,
                    x: ((relX - rect.width / 2) / rect.width) * movement,
                    y: ((relY - rect.height / 2) / rect.height) * movement,
                    ease: "power2.out",
                  });
                };

                const mouseMoveHandler = (e: MouseEvent): void => {
                  parallaxIt(e, circle, 80);
                };

                const mouseLeaveHandler = (): void => {
                  gsap.to(circle, {
                    duration: 0.5,
                    x: 0,
                    y: 0,
                    ease: "power2.out",
                  });
                };

                btn.addEventListener("mousemove", mouseMoveHandler);
                btn.addEventListener("mouseleave", mouseLeaveHandler);
                
                parallaxHandlers.set(btn, { mousemove: mouseMoveHandler, mouseleave: mouseLeaveHandler });
              });
            }
            
            // Store cleanup function
            cleanupFunctions.push(() => {
              btnHandlers.forEach((handlerSet, btn) => {
                btn.removeEventListener("mouseenter", handlerSet.mouseenter);
                btn.removeEventListener("mouseout", handlerSet.mouseout);
              });
              parallaxHandlers.forEach((handlerSet, btn) => {
                btn.removeEventListener("mousemove", handlerSet.mousemove);
                btn.removeEventListener("mouseleave", handlerSet.mouseleave);
              });
            });
          };

          const initImageCursorAnimation = (): void => {
            const imgCursor: HTMLElement | null =
              document.querySelector(".img-cursor");

            if (!imgCursor) {
              return;
            }

            gsap.set(imgCursor, { yPercent: -50, xPercent: -50 });

            const targetElements: HTMLElement[] = gsap.utils.toArray(
              ".hero-fin__title, .work-digital__item-thumb"
            );

            targetElements.forEach((el: HTMLElement) => {
              const image: HTMLElement | null = el.querySelector(".img-cursor");

              if (!image) return;

              const setX = gsap.quickSetter(image, "x", "px");
              const setY = gsap.quickSetter(image, "y", "px");

              const align = (e: MouseEvent): void => {
                setX(e.clientX);
                setY(e.clientY);
              };

              const startFollow = (): void => {
                document.addEventListener("mousemove", align);
              };

              const stopFollow = (): void => {
                document.removeEventListener("mousemove", align);
              };

              const fade = gsap.to(image, {
                autoAlpha: 1,
                ease: "none",
                paused: true,
                onReverseComplete: stopFollow,
              });

              el.addEventListener("mouseenter", (e: MouseEvent): void => {
                fade.play();
                startFollow();
                align(e);
              });

              el.addEventListener("mouseleave", (): void => {
                fade.reverse();
              });
            });
          };

          const initHeroTitleAnimation = (): void => {
            const words: NodeListOf<HTMLElement> =
              document.querySelectorAll(".word-animation");

            if (words.length <= 0) {
              return;
            }

            words.forEach((word: HTMLElement) => {
              const characters: string = word.innerHTML
                .split("")
                .map((char: string) => {
                  if (char === " ") {
                    return `<span class="char">&nbsp;</span>`;
                  }
                  return `<span class="char">${char}</span>`;
                })
                .join("");
              word.innerHTML = characters;
            });

            const charElements: NodeListOf<Element> =
              document.querySelectorAll(".char");

            if (charElements.length > 0) {
              gsap.from(".char", {
                duration: 1,
                opacity: 0,
                y: 100,
                ease: "power3.out",
                stagger: 0.05,
                // delay: 2,
              });
            }
          };

          const initTextRevealAnimation = (): void => {
            const textRevealSections: NodeListOf<Element> =
              document.querySelectorAll(".text-reveal-section");

            if (textRevealSections.length <= 0) {
              return;
            }

            textRevealSections.forEach((section: Element) => {
              const text: Element | null =
                section.querySelector(".text-reveal");

              if (text) {
                const split = new SplitText(text as Element, {
                  type: "chars",
                });

                gsap
                  .timeline({
                    scrollTrigger: {
                      trigger: section,
                      start: "top top",
                      end: "bottom",
                      pin: true,
                      scrub: 0.75,
                      markers: false,
                    },
                  })
                  .set(
                    split.chars,
                    {
                      color: "#0f0f0f",
                      stagger: 0.1,
                    },
                    0.1
                  );
              }
            });
          };

          const initWorkDigitalAnimation = (): void => {
            const workDigital: HTMLElement | null =
              document.querySelector(".work-digital");
            const workDigitalTitle: HTMLElement | null = document.querySelector(
              ".work-digital .section__header-sub-title-v12"
            );

            if (!workDigitalTitle || !workDigital) {
              return;
            }

            if (deviceWidth > 992) {
              gsap.from(".work-digital .section__header-sub-title-v12", {
                x: -200,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                  trigger: workDigital,
                  start: "top center",
                  toggleActions: "play none none none",
                },
              });
            }
          };

          const initResponsiveBreakpointAnimation = (): void => {
            const breakpoints: Breakpoints = {
              small: {
                scaleStart: 0,
                xStart: -150,
                yStart: -100,
                scaleMiddle: 0.5,
                xMiddle: -100,
                yMiddle: -50,
                scaleEnd: 1,
                xEnd: 0,
                yEnd: 0,
              },
              large: {
                scaleStart: 0,
                xStart: -300,
                yStart: -200,
                scaleMiddle: 0.5,
                xMiddle: -250,
                yMiddle: -100,
                scaleEnd: 1,
                xEnd: 0,
                yEnd: 0,
              },
            };

            const getBreakpoint = (): BreakpointConfig => {
              if (deviceWidth < 768) {
                return breakpoints.small;
              } else {
                return breakpoints.large;
              }
            };

            const workDigital: HTMLElement | null =
              document.querySelector(".work-digital");
            const workDigitalTitle: HTMLElement | null = document.querySelector(
              ".work-digital .section__header-title-v12"
            );

            if (!workDigital || !workDigitalTitle) {
              return;
            }

            const applyAnimation = (): void => {
              const bp: BreakpointConfig = getBreakpoint();

              if (deviceWidth > 992) {
                gsap.fromTo(
                  ".work-digital .section__header-title-v12",
                  {
                    scale: bp.scaleStart,
                    x: bp.xStart,
                    y: bp.yStart,
                  },
                  {
                    scale: bp.scaleMiddle,
                    x: bp.xMiddle,
                    y: bp.yMiddle,
                    duration: 1,
                    scrollTrigger: {
                      trigger: workDigital,
                      start: "top center",
                      toggleActions: "play none none none",
                    },
                    onComplete: (): void => {
                      gsap.to(".work-digital .section__header-title-v12", {
                        scale: bp.scaleEnd,
                        x: bp.xEnd,
                        y: bp.yEnd,
                        scrollTrigger: {
                          trigger: workDigital,
                          start: "top center",
                          end: "bottom center",
                          scrub: true,
                        },
                      });
                    },
                  }
                );
              }
            };

            applyAnimation();
          };

          const initHorizontalSliderAnimation = (): void => {
            const animateItems = (config: AnimateItemsConfig): void => {
              const {
                containerSelector,
                itemSelector,
                childCount,
                xOffset,
                opacity,
                duration,
                stagger,
                startTrigger,
                deviceWidthThreshold = 992,
              } = config;

              const container: HTMLElement | null =
                document.querySelector(containerSelector);
              const items: NodeListOf<Element> = document.querySelectorAll(
                `${itemSelector}:nth-child(-n+${childCount})`
              );

              if (!container || items.length === 0) {
                return;
              }

              if (deviceWidth > deviceWidthThreshold) {
                gsap.from(items, {
                  x: xOffset,
                  opacity: opacity,
                  duration: duration,
                  stagger: stagger,
                  scrollTrigger: {
                    trigger: container,
                    start: startTrigger,
                    toggleActions: "play none none none",
                  },
                });
              }
            };

            const setupScrollAnimation = (
              config: ScrollAnimationConfig
            ): void => {
              const {
                triggerSelector,
                itemsSelector,
                scrollDuration = 2.5,
                deviceWidthThreshold = 991,
                xPercentMultiplier = 100,
                snapMultiplier = 1,
                num = 2,
              } = config;

              const triggerElement: HTMLElement | null =
                document.querySelector(triggerSelector);
              const items: HTMLElement[] = gsap.utils.toArray(itemsSelector);

              if (!triggerElement || items.length === 0) {
                return;
              }

              if (deviceWidth > deviceWidthThreshold) {
                gsap.to(items, {
                  xPercent: -xPercentMultiplier * (items.length - num),
                  scrollTrigger: {
                    trigger: triggerElement,
                    pin: true,
                    start: "center center",
                    end: `+=${scrollDuration * 1000}`,
                    scrub: true,
                    snap: snapMultiplier / (items.length - 2),
                    markers: false,
                    onToggle: (self: ScrollTrigger): void => {
                      const parentElement: HTMLElement | null =
                        triggerElement.parentElement;
                      if (parentElement) {
                        if (self.isActive) {
                          parentElement.classList.add("pinned");
                        } else {
                          parentElement.classList.remove("pinned");
                        }
                      }
                    },
                  },
                });
              }
            };

            const itemAnimations: AnimateItemsConfig[] = [
              {
                containerSelector: ".work-digital__items",
                itemSelector: ".work-digital__item",
                childCount: 3,
                xOffset: 200,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                startTrigger: "top center",
              },
              {
                containerSelector: ".service-sa__items",
                itemSelector: ".service-sa__item",
                childCount: 4,
                xOffset: 200,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                startTrigger: "top center",
              },
              {
                containerSelector: ".funfact__items",
                itemSelector: ".funfact__item",
                childCount: 4,
                xOffset: 200,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                startTrigger: "top center",
              },
            ];

            const scrollAnimations: ScrollAnimationConfig[] = [
              {
                triggerSelector: ".work-digital",
                itemsSelector: ".work-digital__item",
                scrollDuration: 3,
                deviceWidthThreshold: 991,
                num: 2,
              },
              {
                triggerSelector: ".service-sa__area",
                itemsSelector: ".service-sa__item",
                scrollDuration: 2.8,
                deviceWidthThreshold: 991,
                num: 4,
              },
              {
                triggerSelector: ".funfact__area",
                itemsSelector: ".funfact__item",
                scrollDuration: 2.8,
                deviceWidthThreshold: 991,
                num: 4,
              },
            ];

            itemAnimations.forEach((config: AnimateItemsConfig) => {
              animateItems(config);
            });

            scrollAnimations.forEach((config: ScrollAnimationConfig) => {
              setupScrollAnimation(config);
            });
          };

          const initPineVanishAnimation = (): void => {
            const pineVanishElements: HTMLElement[] =
              gsap.utils.toArray(".an-pine-vanish");

            if (pineVanishElements.length === 0) {
              return;
            }

            if (deviceWidth > 767) {
              pineVanishElements.forEach((item: HTMLElement) => {
                gsap.to(item, {
                  opacity: 0,
                  scale: 0.9,
                  y: 50,
                  scrollTrigger: {
                    trigger: item,
                    scrub: true,
                    start: "bottom bottom",
                    pin: true,
                    pinSpacing: false,
                    markers: false,
                  },
                });
              });
            }
          };

          const initFadeUpAnimation = (): void => {
            const fadeArrayItems: NodeListOf<Element> =
              document.querySelectorAll(".fade_up_anim");

            if (fadeArrayItems.length === 0) {
              return;
            }

            const fadeArray: Element[] = gsap.utils.toArray(".fade_up_anim");

            fadeArray.forEach((item: Element) => {
              const fadeDirection: string =
                item.getAttribute("data-fade-from") || "bottom";
              const onScrollValue: number = 1;
              const durationValue: number = parseFloat(
                item.getAttribute("data-duration") || "0.75"
              );
              const fadeOffset: number = 40;
              const delayValue: number = parseFloat(
                item.getAttribute("data-delay") || "0.15"
              );
              const easeValue: string = "power2.out";

              const animationSettings: gsap.TweenVars & {
                scrollTrigger?: ScrollTrigger.Vars;
              } = {
                opacity: 0,
                ease: easeValue,
                duration: durationValue,
                delay: delayValue,
              };

              switch (fadeDirection) {
                case "top":
                  animationSettings.y = -fadeOffset;
                  break;
                case "left":
                  animationSettings.x = -fadeOffset;
                  break;
                case "bottom":
                  animationSettings.y = fadeOffset;
                  break;
                case "right":
                  animationSettings.x = fadeOffset;
                  break;
                default:
                  animationSettings.y = fadeOffset;
                  break;
              }

              if (onScrollValue === 1) {
                animationSettings.scrollTrigger = {
                  trigger: item as Element,
                  start: "top bottom",
                  markers: false,
                };
              }

              gsap.from(item, animationSettings);
            });
          };

          const initSectionJumpAnimation = (): void => {
            const links: NodeListOf<Element> =
              document.querySelectorAll(".section-link");

            if (links.length === 0) {
              return;
            }

            links.forEach((link: Element) => {
              link.addEventListener(
                "click",
                function (this: HTMLAnchorElement, event: Event): void {
                  event.preventDefault();

                  const targetID: string | null = this.getAttribute("href");

                  if (!targetID) {
                    return;
                  }

                  const targetSection: HTMLElement | null =
                    document.querySelector(targetID);

                  if (targetSection) {
                    gsap.to(window, {
                      duration: 1,
                      scrollTo: {
                        y: targetSection,
                        offsetY: 50,
                      },
                    });
                  }
                }
              );
            });
          };

          const initImageRevealPopupAnimation = (): void => {
            const itemPopupElements: NodeListOf<Element> =
              document.querySelectorAll(".item-popup");

            if (itemPopupElements.length === 0) {
              return;
            }
            itemPopupElements.forEach((item: Element, index: number) => {
              const delayAttribute: string | null =
                item.getAttribute("data-delay");
              const customDelay: number = delayAttribute
                ? parseFloat(delayAttribute)
                : 0;

              gsap.from(item, {
                scrollTrigger: {
                  trigger: item,
                  start: "top bottom",
                },
                y: 200,
                opacity: 0,
                duration: 1.5,
                ease: "power4.out",
                delay: index * 0.3 + customDelay,
              });
            });
          };

          ScrollTrigger.refresh();
          initCustomCursor();
          initImageMovement();
          initButtonHoverAnimation();
          initImageCursorAnimation();
          initHeroTitleAnimation();
          initTextRevealAnimation();
          initWorkDigitalAnimation();
          initResponsiveBreakpointAnimation();
          initHorizontalSliderAnimation();
          initPineVanishAnimation();
          initFadeUpAnimation();
          initSectionJumpAnimation();
          initImageRevealPopupAnimation();
        };

        initGSAP();
      } catch (error) {
        // Silently handle GSAP initialization errors
      }
    };

    const timeoutId = setTimeout(() => {
      initializeGSAP();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      
      // Run all cleanup functions
      cleanupFunctions.forEach((cleanup) => cleanup());
      
      if (typeof window !== "undefined") {
        try {
          import("gsap/ScrollTrigger")
            .then(({ default: ScrollTrigger }) => {
              ScrollTrigger?.getAll()?.forEach((t: ScrollTrigger) => t.kill());
            })
            .catch(() => {});
        } catch (e) {}
        // if (smoother) {
        //   smoother.kill();
        //   smoother = null;
        // }
      }
    };
  }, [pathname, isClient]);
};

export default useGSAPAnimations;
