Yaco Sphinx Theme
=================

This repository contains Sphinx themes for Yaco related projects.
To use a theme in your Sphinx documentation, follow these steps:

1. add this directory as _themes into your docs folder. Alternatively,
   you can also use the git submodules functionality to check out the contents
   into yor docs folder, or just symlink this directory as _themes.

2. add this to your conf.py::

    sys.path.append(os.path.abspath('_themes'))
    html_theme_path = ['_themes']
    html_theme = 'yaco'
    pygments_style = 'yaco_theme_support.YacoStyle'
    html_logo = 'logo_orange.png'

3. add this rule to your Makefile::

    slides:
        $(SPHINXBUILD) -b html -D html_theme=htmlslide $(ALLSPHINXOPTS) $(BUILDDIR)/slides
        @echo
        @echo "Build finished. The HTML pages are in $(BUILDDIR)/slides."

4. in order to render PDFs you need to have texlive installed with latex support.

   Ubuntu: ``aptitude install texlive-full``

   Arch Linux: ``pacman -S texlive-latexextra``

5. To support hyphenation in spanish.

   Ubuntu: ``aptitude install texlive-lang-spanish``

   Arch Linux: included in texlive-latexextra


5. you are now good to go :)

This repository contains the following themes:

- **yaco** - the generic Yaco Project documentation theme. Orange color.
- **htmlslide** - A slide theme. Orange color.
