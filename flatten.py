import os
import re

src_dir = "./build"
dist_dir = "./dist"

if not os.path.exists(dist_dir):
    os.makedirs(dist_dir)

# Regular expressions to match and adjust TypeScript/JavaScript import/require paths
import_re = re.compile(r"(import .*? from \")(.*?)(\")")
require_re = re.compile(r"(require\(\")(.*?)(\"\))")


def adjust_imports(content, old_directory):
    def replacer(match):
        path = match.group(2)
        if path.startswith('.'):
            adjusted_path = os.path.normpath(os.path.join(old_directory, path))
            relative_path_from_src = os.path.relpath(adjusted_path, src_dir)
            adjusted_import = relative_path_from_src.replace(os.sep, '_').replace('./', '')
            return f"{match.group(1)}{adjusted_import}{match.group(3)}"
        return match.group(0)

    content = import_re.sub(replacer, content)
    content = require_re.sub(replacer, content)
    return content


for root, _, files in os.walk(src_dir):
    for file in files:
        if file.endswith(".ts") or file.endswith(".js"):
            source = os.path.join(root, file)
            destination = os.path.join(dist_dir, os.path.relpath(source, src_dir).replace(os.sep, '_'))
            
            with open(source, 'r') as src_file:
                content = src_file.read()
                content = adjust_imports(content, os.path.dirname(source))

                with open(destination, 'w') as dest_file:
                    dest_file.write(content)
