tinymce.init({
  selector: "textarea#postContent",
  plugins: "lists link image table code help wordcount",
  setup: function (editor) {
    editor.on("change", function () {
      tinymce.triggerSave();
    });
  },
});
