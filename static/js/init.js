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

// Chatbot functionality
document.addEventListener('DOMContentLoaded', () => {
  const chatbotFloat = document.getElementById('chatbot-float');
  const chatbotPopover = document.getElementById('chatbot-popover');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotHandoffBtn = document.getElementById('chatbot-handoff-btn');

  if (!chatbotFloat || !chatbotPopover) return;

  // Toggle popover
  chatbotFloat.addEventListener('click', (e) => {
    if (e.target.closest('[click-propagation-preventer]')) {
      return;
    }
    const isOpen = chatbotPopover.classList.contains('is-open');
    if (isOpen) {
      chatbotPopover.classList.remove('is-open');
      chatbotFloat.setAttribute('aria-expanded', 'false');
    } else {
      chatbotPopover.classList.add('is-open');
      chatbotFloat.setAttribute('aria-expanded', 'true');
      if (chatbotInput) chatbotInput.focus();
    }
  });

  // Close button
  if (chatbotClose) {
    chatbotClose.addEventListener('click', (e) => {
      e.stopPropagation();
      chatbotPopover.classList.remove('is-open');
      chatbotFloat.setAttribute('aria-expanded', 'false');
    });
  }

  const replies = {
    "hello": "Hello! How can I assist you today? I can tell you about Stephen's tech services, designs, or writing.",
    "hi": "Hello! How can I assist you today? I can tell you about Stephen's tech services, designs, or writing.",
    "hey": "Hello! How can I assist you today? I can tell you about Stephen's tech services, designs, or writing.",
    "services": "Stephen offers Systems Advisory, Managed Open Source Infrastructure, Cybersecurity Auditing, and Custom Software Integration. Check the /services/ page for details!",
    "work": "Stephen offers Systems Advisory, Managed Open Source Infrastructure, Cybersecurity Auditing, and Custom Software Integration. Check the /services/ page for details!",
    "hire": "Stephen offers Systems Advisory, Managed Open Source Infrastructure, Cybersecurity Auditing, and Custom Software Integration. Check the /services/ page for details!",
    "cv": "Stephen's Curriculum Vitae outlines his background, education, and roles. Read it at /cv/!",
    "resume": "Stephen's Curriculum Vitae outlines his background, education, and roles. Read it at /cv/!",
    "contact": "You can reach Stephen via email at alunje73@gmail.com, or schedule a session using the 'Book a Call' widget.",
    "email": "You can reach Stephen via email at alunje73@gmail.com, or schedule a session using the 'Book a Call' widget.",
    "call": "You can book a direct advisory call with Stephen by clicking the Calendar icon floating button in the bottom right corner!",
    "sovereign": "Sovereignty is all about data ownership, self-hosting, and open source integration. Stephen builds secure and private digital environments for SMEs.",
    "indieweb": "This website is built following IndieWeb standards, meaning it supports self-hosting, POSSE syndication, h-cards, and Webmentions response logs."
  };

  function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `chatbot-popover__msg chatbot-popover__msg--${sender}`;
    msg.textContent = text;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function handleSend() {
    const text = chatbotInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    chatbotInput.value = '';

    const typing = document.createElement('div');
    typing.className = 'chatbot-popover__msg chatbot-popover__msg--bot typing-indicator';
    typing.textContent = 'Typing...';
    chatbotMessages.appendChild(typing);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    setTimeout(() => {
      typing.remove();
      const lower = text.toLowerCase();
      let match = "I'm Stephen's digital assistant. For specialized inquiries, systems engineering, or audits, feel free to use the 'Initiate Handover' button above to contact Stephen directly on WhatsApp!";
      for (let key in replies) {
        if (lower.includes(key)) {
          match = replies[key];
          break;
        }
      }
      addMessage(match, 'bot');
    }, 850);
  }

  if (chatbotSend && chatbotInput) {
    chatbotSend.addEventListener('click', handleSend);
    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  if (chatbotHandoffBtn) {
    chatbotHandoffBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addMessage("Handoff initiated! Redirecting you to Stephen on WhatsApp...", "bot");
      setTimeout(() => {
        window.open("https://wa.me/254740128010?text=Hi%20Stephen,%20I'm%20initiating%20a%20chatbot%20handover%20from%20your%20sovereign%20website.", "_blank");
      }, 800);
    });
  }
});
