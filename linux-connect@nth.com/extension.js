const { GObject, St } = imports.gi;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;
const Lang = imports.lang;
const Gio = imports.gi.Gio;

const MyCustomWidget = GObject.registerClass(
class MyCustomWidget extends PanelMenu.Button {
    _init() {
        super._init(0.0, "My Custom Widget");

        let gfile = Gio.File.new_for_path(__dirname + "/linux-connect.py");
        let gfile_info = gfile.query_info("standard::content-type", Gio.FileQueryInfoFlags.NONE, null);
        let content_type = gfile_info.get_content_type();

        if (content_type === "text/x-python") {
            let [success, contents] = gfile.load_contents(null);
            if (success) {
                let py_code = new Lang.Script(contents);
                py_code.run();

                let widget = py_code.exports.MyCustomWidget();
                this.add_child(widget.get_widget());
            }
        }
    }
});

class Extension {
    constructor() {}

    enable() {
        this._widget = new MyCustomWidget();
        Main.panel.addToStatusArea('mycustomwidget', this._widget);
    }

    disable() {
        this._widget.destroy();
        this._widget = null;
    }
}

function init() {
    return new Extension();
}