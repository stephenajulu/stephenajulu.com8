---
title: Contact
hide_title: false
sections:
  - type: form_section
    section_id: contact-form
    content: >-
      Let’s build something great together.<br>If you have a question please leave a message, I’m always happy to hear from interesting people doing interesting things.
    form_id: contactForm
    form_action: /thank-you
    form_fields:
      - input_type: text
        name: name
        label: Name
        default_value: Your name
        is_required: true
      - input_type: email
        name: email
        label: Email
        default_value: Your email address
        is_required: true
      - input_type: textarea
        name: message
        label: Message
        default_value: Your message
      - input_type: checkbox
        name: consent
        label: >-
          I understand that this form is storing my submitted information so I
          can be contacted.
    submit_label: Send Message
seo:
  title: Ask me anything | Stephen Ajulu
  description: Ask me a question about open source business software, tech, design, cybersecurity, cloud, on-prem cloud, web dev or pretty much anything you think I might be able to help with.
  extra:
    - name: 'og:type'
      value: website
      keyName: property
    - name: 'og:title'
      value: Ask me anything | Stephen Ajulu
      keyName: property
    - name: 'og:description'
      value: Ask me a question about open source business software, tech, design, cybersecurity, cloud, on-prem cloud, web dev or pretty much anything you think I might be able to help with.
      keyName: property
    - name: 'twitter:card'
      value: summary
    - name: 'twitter:title'
      value: Ask me anything | Stephen Ajulu
    - name: 'twitter:description'
      value: Ask me a question about open source business software, tech, design, cybersecurity, cloud, on-prem cloud, web dev or pretty much anything you think I might be able to help with.
layout: advanced
---
{{< consult >}}
