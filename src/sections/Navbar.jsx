import { useRef, useState, useEffect } from "react";
import { socialLinks } from "../constants";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { Link } from "react-scroll";

const Navbar = () => {
  const navRef = useRef(null);
  const burgerRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const iconTl = useRef(null);
  const tl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);
  const [copied, setCopied] = useState(false);

  // GSAP animation logic can be added here
  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: 100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: -20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        [linksRef.current],
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotation: 45,
        y: 3 - 3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotation: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        []
      );
  });

  useEffect(() => {
    if (isOpen) {
      tl.current.play();
      iconTl.current.play();
    } else {
      tl.current.reverse();
      iconTl.current.reverse();
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Only hide burger when navbar is closed
      if (!isOpen) {
        setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  // Click outside to close navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 uppercase bg-black text-white/70 py-20 gap-y-10 md:w-1/2 md:left-1/2"
      >
        <div className="flex flex-col text-3xl gap-y-4 md:text-4xl lg:text-6xl 2xl:text-8xl">
          {/* Navigation Links */}
          {[
            "home",
            "services",
            "about me",
            "projects",
            "tech-stack",
            "contact",
          ].map((section, index) => (
            <div key={index} ref={(el) => (linksRef.current[index] = el)}>
              <Link
                className="transition-all duration-300 cursor-pointer hover:text-white"
                to={section}
                smooth={true}
                duration={600}
                onClick={() => setIsOpen(false)}
              >
                {section}
              </Link>
            </div>
          ))}
        </div>
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-white/50">Email</p>
            <div className="flex items-center gap-2">
              <p className="text-xl tracking-widest text-pretty lowercase">
                faisalhrbk@gmail.com
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText("faisalhrbk@gmail.com");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-2 transition-all duration-300 hover:text-white cursor-pointer"
                aria-label="Copy email"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
              {copied && (
                <span className="text-sm text-green-400 animate-pulse">
                  Copied!
                </span>
              )}
            </div>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-white/50">Social Media</p>
            <div className="flex  flex-wrap md:flex-row gap-x-3 gap-y-2 text-xl ">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  className=" hover:text-white pt-1"
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* burger menu */}
      <div
        ref={burgerRef}
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-black rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 right-10"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className=" block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className=" block w-8 h-0.5 bg-white rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};

export default Navbar;
