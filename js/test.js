 Preview = Class.create({
        initialize: function (a) {
            this._options =
            a;
            this._id = this._options.dialog;
            this._callback = this._options.callback || Prototype.emptyFunction;
            this._dialog = $(this._id);
            this._container = this._dialog.down(".preview-container");
            this._buttons = $H({
                cancel: this._dialog.down(".preview-cancel-button"),
                submit: this._dialog.down(".preview-submit-button"),
                close: this._dialog.down(".preview-close-button")
            });
            if (typeof Preview.lastContent == "undefined") Preview.lastContent = [];
            Preview.lastContent && Preview.lastContent[this._id] && this._container.update(Preview.lastContent[this._id]);
            this._cancelHandler = this.cancel.bind(this);
            this._submitHandler = this.send.bind(this);
            this._buttons.get("cancel") && this._buttons.get("cancel").observe("click", this._cancelHandler);
            this._buttons.get("close") && this._buttons.get("close").observe("click", this._cancelHandler);
            this._buttons.get("submit") && this._buttons.get("submit").observe("click", this._submitHandler);
            $$("body").first().insert(this._dialog);
            new Ajax.Request(this._options.url, {
                parameters: this._options.parameters,
                onComplete: this._onComplete.bind(this)
            });
            this._dialog.setStyle({
                display: "",
                visibility: "hidden"
            });
            xing.controls.Overlay.start(this._dialog);
            this._dialog.setStyle({
                visibility: ""
            })
        },
        cancel: function () {
            this._dialog.hide();
            xing.controls.Overlay.stop();
            this._buttons.get("cancel") && this._buttons.get("cancel").stopObserving("click", this._cancelHandler);
            this._buttons.get("close") && this._buttons.get("close").stopObserving("click", this._cancelHandler);
            this._buttons.get("submit") && this._buttons.get("submit").stopObserving("click", this._submitHandler)
        },
        send: function () {
            if (this._loaded) {
                this.cancel();
                this._callback()
            }
        },
        _onComplete: function (a) {
            if (!Preview.lastContent || !Preview.lastContent[this._id]) Preview.lastContent[this._id] = this._container.innerHTML;
            this._container.update(a.responseText);
            xing.controls.Overlay.refreshDisplay();
            this._loaded = true
        }
    })