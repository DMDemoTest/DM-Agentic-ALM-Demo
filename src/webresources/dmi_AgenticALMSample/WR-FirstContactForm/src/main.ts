const PRIORITY_HIGH = 100000000;
const NOTIFICATION_ID = "firstContactPriority";

/**
 * Runs on the OnLoad event of the First Contact (dmi_FirstContact) main form.
 * Register in Dataverse: Library = dmi_/scripts/FirstContactForm.js,
 * Function = FirstContactForm.onLoad, pass execution context = true.
 *
 * NOTE: The Vite IIFE name is "FirstContactForm", so this export becomes
 * window.FirstContactForm.onLoad — exactly what Dataverse calls.
 */
export function onLoad(executionContext: Xrm.Events.EventContext): void {
  const formContext = executionContext.getFormContext();

  // AI-inferred fields should not be manually edited — lock them
  lockAiFields(formContext);

  // Show a warning banner for high-priority signals and keep it updated
  updatePriorityBanner(formContext);
  formContext.getAttribute("dmi_priority")?.addOnChange(onPriorityChange);
}

function onPriorityChange(executionContext: Xrm.Events.EventContext): void {
  updatePriorityBanner(executionContext.getFormContext());
}

function lockAiFields(formContext: Xrm.FormContext): void {
  for (const fieldName of ["dmi_intent", "dmi_actions"]) {
    formContext.getAttribute(fieldName)?.controls.forEach((ctrl) => {
      (ctrl as Xrm.Controls.StringControl).setDisabled(true);
    });
  }
}

function updatePriorityBanner(formContext: Xrm.FormContext): void {
  const priority = formContext.getAttribute("dmi_priority")?.getValue() as number | null;
  formContext.ui.clearFormNotification(NOTIFICATION_ID);

  if (priority === PRIORITY_HIGH) {
    formContext.ui.setFormNotification(
      "HIGH PRIORITY — This signal requires immediate attention.",
      "WARNING",
      NOTIFICATION_ID
    );
  }
}
