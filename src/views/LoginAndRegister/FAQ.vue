<template>
  <div class="d-flex flex-wrap justify-center align-center">
    <div >
      <div style="margin-top: 69px" class="FAQ d-flex justify-center align-center">FAQ</div>
      <div>
        <div class="titleText">Konto</div>
        <FAQText
            question="Ich habe keine E-Mail zur Bestätigung meiner Anmeldung erhalten."
            answer="Bitte schreiben Sie uns eine E-Mail an: support@valetudo.co"/>

        <FAQText
            style="margin-top: 8px"
            question="Muss ich mich registrieren, um die Anwendung kostenlos nutzen zu können?"
            answer="Ja"/>

        <div class="titleText">Zahlung</div>
        <FAQText
            question="Welche Zahlungsarten akzeptieren Sie? "
            answer="Paypal, Rechnung, Vorkasse. Wir senden Dir eine separate E-Mail, wenn Du als Zahlungsart Rechnung, Vorkasse wählst."/>

        <div class="titleText">Bestellung</div>
        <FAQText
            question="Wie kann ich meine Bestellung verfolgen? "
            answer="Wir senden Dir eine weitere E-Mail, wenn das Paket zu Dir unterwegs ist. Dort findest du einen Link, um Deine Bestellung zu verfolgen."/>

        <div class="titleText">Erstattung</div>
        <FAQText
            question="Kann ich meine Bestellung stornieren und eine Rückerstattung erhalten?"
            answer="Sobald die Bestellung auf der Plattform bestätigt wurde, ist sie nicht mehr erstattungsfähig."/>
      </div>
    </div>
  </div>
</template>

<script>
import FAQText from "@/components/FAQText";

export default {
  name: "FAQ",
  components: {FAQText}
}
</script>

<style scoped>
.FAQ {
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 125%;
}
.titleText{
  margin-top: 40px;
  margin-bottom: 8px;
  font-family: Gill Sans Nova;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 52px;
  /* identical to box height */

  display: flex;
  align-items: center;

  color: #4C4C4C;
}
</style>
