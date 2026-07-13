/*
  * reframe.js - Reframe.js: responsive iframes for embedded content
  * @version v2.2.7
  * @link https://github.com/dollarshaveclub/reframe.js#readme
  * @author Jeff Wainwright <jjwainwright2@gmail.com> (http://jeffry.in)
  * @license MIT
*/
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).reframe=t()}(this,function(){"use strict";return function(e,t){var i="string"==typeof e?document.querySelectorAll(e):e,n=t||"js-reframe";"length"in i||(i=[i]);for(var o=0;o<i.length;o+=1){var r=i[o];if(!(-1!==r.className.split(" ").indexOf(n)||-1<r.style.width.indexOf("%"))){var d=(r.getAttribute("height")||r.offsetHeight)/(r.getAttribute("width")||r.offsetWidth)*100,f=document.createElement("div");f.className=n;var s=f.style;s.position="relative",s.width="100%",s.paddingTop=d+"%";var a=r.style;a.position="absolute",a.width="100%",a.height="100%",a.left="0",a.top="0",r.parentNode.insertBefore(f,r),r.parentNode.removeChild(r),f.appendChild(r)}}}});

// Handle responsive video embeds
window.addVideoEmbedsHandlers = function() {
	reframe('iframe[src*="youtube.com"],iframe[src*="vimeo.com"]');
};

window.removeVideoEmbedsHandlers = function() {
	const frameWrappers = document.querySelectorAll('.js-reframe');
	if (frameWrappers) {
		for (let i = 0; i < frameWrappers.length; i += 1) {
			const frameWrapper = frameWrappers[i];
			const frame = frameWrapper.firstChild;
			frame.removeAttribute('style');
			frameWrapper.parentNode.insertBefore(frame, frameWrapper);
			frameWrapper.parentNode.removeChild(frameWrapper);
		}
	}
};

// Handle navigation
function navToggleHandler(e) {
	e.preventDefault();
	document.body.classList.toggle('js-nav-open');
}

window.addMainNavigationHandlers = function() {
	const menuToggle = document.querySelectorAll('.js-nav-toggle');
	if (menuToggle) {
		for (let i = 0; i < menuToggle.length; i++) {
			menuToggle[i].addEventListener('click', navToggleHandler, false);
		}
	}
};

window.removeMainNavigationHandlers = function() {
	document.body.classList.remove('js-nav-open');
	const menuToggle = document.querySelectorAll('.js-nav-toggle');
	if (menuToggle) {
		for (let i = 0; i < menuToggle.length; i++) {
			menuToggle[i].removeEventListener('click', navToggleHandler, false);
		}
	}
};

window.addEventListener('resize', function () {
  if (document.querySelector('.js-nav-toggle').offsetParent === null) {
    document.body.classList.remove('js-nav-open');
  }
}, true);

// Robust Client-side Theme Toggle Handler
function setupThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function(e) {
      e.preventDefault();
      let currentTheme = localStorage.getItem("theme") || "dark";
      let newTheme = currentTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      document.body.classList.remove("palette-light", "palette-dark");
      document.body.classList.add("palette-" + newTheme);
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupThemeToggle);
} else {
  setupThemeToggle();
}

// Click to Copy Code Blocks
document.addEventListener("DOMContentLoaded", function() {
  const codeBlocks = document.querySelectorAll("pre > code");
  codeBlocks.forEach(codeBlock => {
    const pre = codeBlock.parentNode;
    pre.style.position = "relative";
    
    const copyButton = document.createElement("button");
    copyButton.className = "copy-code-button";
    copyButton.innerText = "Copy";
    copyButton.setAttribute("aria-label", "Copy code");
    
    pre.appendChild(copyButton);
    
    copyButton.addEventListener("click", function() {
      const codeText = codeBlock.innerText;
      navigator.clipboard.writeText(codeText).then(() => {
        copyButton.innerText = "Copied!";
        setTimeout(() => {
          copyButton.innerText = "Copy";
        }, 2000);
      }).catch(err => {
        console.error("Failed to copy code", err);
      });
    });
  });
});

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/pwabuilder-sw.js')
      .then(reg => console.log('Service Worker registered successfully.', reg))
      .catch(err => console.error('Service Worker registration failed.', err));
  });
}

// Scroll progress bar and sticky header scrolled class
window.addEventListener('scroll', () => {
  // Scroll progress
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (progressBar) {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    progressBar.style.width = scrolled + '%';
  }

  // Header scroll state
  const header = document.getElementById('masthead');
  if (header) {
    if (window.scrollY > 15) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
});

