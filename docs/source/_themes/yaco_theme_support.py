# -*- coding: utf-8 -*-
from pygments.style import Style
from pygments.token import Keyword, Name, Comment, String, Error, \
     Number, Operator, Generic, Whitespace, Punctuation, Other, Literal

class YacoStyle(Style):
    """
    Yaco pygments style based on friendly style.
    Hardly based in pylons style
    """

    # work in progress...

    background_color = "#f8f8f8"
    default_style = ""

    styles = {
        Whitespace:                "#bbbbbb",
        Comment:                   "italic #60a0b0",
        Comment.Preproc:           "noitalic #C59B00",
        Comment.Special:           "noitalic bg:#fff0f0",

        Keyword:                   "bold #C59B00",
        Keyword.Pseudo:            "nobold",
        Keyword.Type:              "#902000",

        Operator:                  "#666666",
        Operator.Word:             "bold #C59B00",

        Name.Builtin:              "#C59B00",
        Name.Function:             "#06287e",
        Name.Class:                "bold #fb9c00",
        Name.Namespace:            "bold #fb9c00",
        Name.Exception:            "#C59B00",
        Name.Variable:             "#bb60d5",
        Name.Constant:             "#60add5",
        Name.Label:                "bold #002070",
        Name.Entity:               "bold #d55537",
        Name.Attribute:            "#fb9c00",
        Name.Tag:                  "bold #062873",
        Name.Decorator:            "bold #555555",

        String:                    "#4070a0",
        String.Doc:                "italic",
        String.Interpol:           "italic #70a0d0",
        String.Escape:             "bold #4070a0",
        String.Regex:              "#235388",
        String.Symbol:             "#517918",
        String.Other:              "#c65d09",
        Number:                    "#40a070",

        Generic.Heading:           "bold #000080",
        Generic.Subheading:        "bold #800080",
        Generic.Deleted:           "#A00000",
        Generic.Inserted:          "#00A000",
        Generic.Error:             "#FF0000",
        Generic.Emph:              "italic",
        Generic.Strong:            "bold",
        Generic.Prompt:            "bold #c65d09",
        Generic.Output:            "#888",
        Generic.Traceback:         "#04D",

        Error:                     "#a40000 bg:#fbe3e4"
    }
