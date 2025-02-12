from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

class ActionProvideSymptom(Action):

    def name(self) -> Text:
        return "action_provide_symptom"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Extract the symptom from the user's message
        symptom = tracker.latest_message['text']

        # Simple logic to determine the health issue based on the symptom
        health_issue = "unknown"
        if "headache" in symptom:
            health_issue = "a headache"
        elif "dizzy" in symptom:
            health_issue = "dizziness"
        elif "fever" in symptom:
            health_issue = "a fever"
        elif "coughing" in symptom:
            health_issue = "a cough"
        elif "sore throat" in symptom:
            health_issue = "a sore throat"
        elif "stomach ache" in symptom:
            health_issue = "a stomach ache"
        elif "nauseous" in symptom:
            health_issue = "nausea"
        elif "rash" in symptom:
            health_issue = "a rash"
        elif "chest pain" in symptom:
            health_issue = "chest pain"
        elif "shortness of breath" in symptom:
            health_issue = "shortness of breath"

        # Set the identified health issue as a slot
        return [SlotSet("health_issue", health_issue)]

class ValidateHealthIssueForm(Action):

    def name(self) -> Text:
        return "validate_health_issue_form"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        health_issue = tracker.get_slot("health_issue")

        if health_issue in ["a headache", "dizziness", "a fever", "a cough", "a sore throat", "a stomach ache", "nausea", "a rash", "chest pain", "shortness of breath"]:
            return [SlotSet("health_issue", health_issue)]
        else:
            dispatcher.utter_message(text="I'm not sure about that health issue. Can you provide more details?")
            return [SlotSet("health_issue", None)]

class ActionAskFollowUp(Action):

    def name(self) -> Text:
        return "action_ask_follow_up"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        health_issue = tracker.get_slot("health_issue")

        if health_issue == "a headache":
            dispatcher.utter_message(text="Do you often feel stressed or anxious?")
        elif health_issue == "dizziness":
            dispatcher.utter_message(text="Do you experience dizziness frequently?")
        elif health_issue == "a fever":
            dispatcher.utter_message(text="Have you been in contact with anyone who is sick?")
        elif health_issue == "a cough":
            dispatcher.utter_message(text="Do you have any other symptoms like shortness of breath?")
        elif health_issue == "a sore throat":
            dispatcher.utter_message(text="Do you have any difficulty swallowing?")
        elif health_issue == "a stomach ache":
            dispatcher.utter_message(text="Have you eaten anything unusual recently?")
        elif health_issue == "nausea":
            dispatcher.utter_message(text="Do you feel nauseous frequently?")
        elif health_issue == "a rash":
            dispatcher.utter_message(text="Have you used any new skincare products recently?")
        elif health_issue == "chest pain":
            dispatcher.utter_message(text="Do you experience chest pain frequently?")
        elif health_issue == "shortness of breath":
            dispatcher.utter_message(text="Do you have any history of respiratory issues?")

        return []

class ActionProvideMentalHealthIssue(Action):

    def name(self) -> Text:
        return "action_provide_mental_health_issue"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        # Extract the symptom from the user's message
        symptom = tracker.latest_message['text']

        # Simple logic to determine the mental health issue based on the symptom
        mental_health_issue = "unknown"
        if "stress" in symptom:
            mental_health_issue = "stress-related issues"
        elif "anxiety" in symptom:
            mental_health_issue = "anxiety disorders"
        elif "depression" in symptom:
            mental_health_issue = "depressive symptoms"
        elif "panic" in symptom:
            mental_health_issue = "panic attacks"
        elif "insomnia" in symptom or "sleep" in symptom:
            mental_health_issue = "sleep disorders"
        elif "overthinking" in symptom:
            mental_health_issue = "excessive worrying"
        elif "mood swings" in symptom:
            mental_health_issue = "mood instability"
        elif "burnout" in symptom:
            mental_health_issue = "work-related burnout"

        # Respond with the identified mental health issue
        dispatcher.utter_message(text=f"Based on what you've told me, it sounds like you might be experiencing {mental_health_issue}. Please consider speaking to a mental health professional for further support.")

        return []