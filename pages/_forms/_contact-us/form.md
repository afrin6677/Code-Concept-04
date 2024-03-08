---
title: Contact Us

form:
  name: contact-us
  fields:
    row_1:
      type: columns
      classes: grid grid-cols-2 gap-x-6
      fields: 
        first_name:
          type: text
          label: METRICALO.FIRST_NAME
          placeholder : METRICALO.FIRST_NAME
          validate:
            required: true  
        last_name:
          type: text
          label: METRICALO.LAST_NAME
          placeholder : METRICALO.LAST_NAME
          validate:
            required: true         
        email:
          type: text
          label: METRICALO.EMAIL
          placeholder : METRICALO.EMAIL
          validate:
            required: true
           
        phone:
          type: text
          label: METRICALO.PHONE
          placeholder : METRICALO.PHONE
    message:
      type: textarea
      label: METRICALO.MESSAGE
      placeholder : METRICALO.MESSAGE
      rows: 10
      validate:
        required: true  
  buttons:
    submit:
      type: submit
      classes: button primary marginTBsm widthFull font-bold
      value: METRICALO.SEND_MESSAGE
  process:
      ApiSendEmail:
        email: "{{ config.data.support.email }}"
        reply_to: "{{ form.value.first_name }} {{ form.value.last_name}} <{{ form.value.email }}>"
        subject: '{{ config.data.company.name }} - Contact Form'
        html: "<html><p>{{ form.value.first_name }} {{ form.value.last_name}} - {{ form.value.email }} - ({{form.value.phone}})</p><p>{{ form.value.message }}</p></html>"
        locale: "{{ grav.languages.language|default('en') }}"
      reset: true
      successful_message: METRICALO.MESSAGE_SENT
      
---

