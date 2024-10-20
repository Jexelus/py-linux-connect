import gi
gi.require_version('Gtk', '4.0')
from gi.repository import Gtk

class MyCustomWidget(Gtk.Box):
    def __init__(self):
        super().__init__(orientation=Gtk.Orientation.HORIZONTAL)
        self.set_spacing(6)

        label = Gtk.Label(label="Hello, World!")
        self.add(label)

    def get_widget(self):
        return self