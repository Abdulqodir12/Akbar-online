document.addEventListener("DOMContentLoaded", () => {
    $(".popup-youtube").magnificPopup({
        type: "iframe",
    });

    // $(".popup-youtube").magnificPopup({
    //     type: "iframe",
    // });

    AOS.init({
        once: true,
    });

    $(document).ready(function () {
        $(".owl-carousel").owlCarousel();
    });

    class Accordion {
        constructor(el) {
            this.el = el;
            this.summary = el.querySelector("summary");
            this.content = el.querySelector(".contents");

            this.animation = null;
            this.isClosing = false;
            this.isExpanding = false;
            this.summary.addEventListener("click", (e) => this.onClick(e));
        }

        onClick(e) {
            e.preventDefault();
            this.el.style.overflow = "hidden";
            if (this.isClosing || !this.el.open) {
                this.open();
            } else if (this.isExpanding || this.el.open) {
                this.shrink();
            }
        }

        shrink() {
            this.isClosing = true;

            const startHeight = `${this.el.offsetHeight}px`;
            const endHeight = `${this.summary.offsetHeight}px`;

            if (this.animation) {
                this.animation.cancel();
            }

            this.animation = this.el.animate(
                {
                    height: [startHeight, endHeight],
                },
                {
                    delay: 240,
                    duration: 120,
                    easing: "linear",
                }
            );

            this.animation.onfinish = () => this.onAnimationFinish(false);
            this.animation.oncancel = () => (this.isClosing = false);
        }

        open() {
            this.el.style.height = `${this.el.offsetHeight}px`;
            this.el.open = true;
            window.requestAnimationFrame(() => this.expand());
        }

        expand() {
            this.isExpanding = true;
            const startHeight = `${this.el.offsetHeight}px`;
            const endHeight = `${
                this.summary.offsetHeight + this.content.offsetHeight
            }px`;

            if (this.animation) {
                this.animation.cancel();
            }

            this.animation = this.el.animate(
                {
                    height: [startHeight, endHeight],
                },
                {
                    delay: 240,
                    duration: 120,
                    easing: "linear",
                }
            );
            this.animation.onfinish = () => this.onAnimationFinish(true);
            this.animation.oncancel = () => (this.isExpanding = false);
        }

        onAnimationFinish(open) {
            this.el.open = open;
            this.animation = null;
            this.isClosing = false;
            this.isExpanding = false;
            this.el.style.height = this.el.style.overflow = "";
        }
    }

    document.querySelectorAll("div").forEach((el) => {
        new Accordion(el);
    });

    const tabs = document.querySelectorAll("[data-tab-target]");
    const tabContents = document.querySelectorAll("[data-tab-content]");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = document.querySelector(tab.dataset.tabTarget);
            tabContents.forEach((tabContent) => {
                tabContent.classList.remove("active");
            });
            tabs.forEach((tab) => {
                tab.classList.remove("active");
            });
            tab.classList.add("active");
            target.classList.add("active");
        });
    });
});
