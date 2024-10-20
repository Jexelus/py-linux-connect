import gi
gi.require_version('Gtk', '4.0')
from gi.repository import Gtk

class MyWindow(Gtk.ApplicationWindow):
    def __init__(self, app):
        super().__init__(application=app, title="linux-connect")
        self.set_default_size(400, 300)

        # Создаем кнопку
        button = Gtk.Button(label="Click Me")
        button.connect("clicked", self.on_button_clicked)

        # Добавляем кнопку в окно
        self.set_child(button)

    def on_button_clicked(self, button):
        print("Hello, World!")

class MyApplication(Gtk.Application):
    def __init__(self):
        super().__init__(application_id="org.nth.linux-connect")

    def do_activate(self):
        win = MyWindow(self)
        win.present()

if __name__ == "__main__":
    app = MyApplication()
    app.run()