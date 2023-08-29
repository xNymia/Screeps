import os, re, sys

src_folder = "src"
dest_folder = "dist"

def get_new_filename(filepath):
    # Given a path within the 'src' folder, returns the new flattened filename
    rel_path = os.path.relpath(filepath, src_folder)
    return rel_path.replace(os.path.sep, '_')

def adjust_imports(content, current_file_dir):
    # Adjusts the imports and requires in the file content

    # Regular expression to match ES6 import statements and CommonJS requires
    patterns = [
        re.compile(r'import (.*from\s?)?[\'"](.+?)[\'"];'),
        re.compile(r'require\([\'"](.+?)[\'"]\)')
    ]

    def replacer(match):
        # Get the import or require path from the match
        import_path = match.group(2) if 'import' in match.group(0) else match.group(1)

        # If it's a relative path, adjust it
        if import_path.startswith("."):
            abs_path = os.path.abspath(os.path.join(current_file_dir, import_path))
            new_path = get_new_filename(abs_path).replace('.js', '')  # Remove the extension
            if 'import' in match.group(0):
                return f'import {match.group(1)}"{new_path}";'
            else:
                return f'require("{new_path}")'

        # If it's not a relative import or require, return it as is
        return match.group(0)

    # Replace all import and require statements in the content
    for pattern in patterns:
        content = pattern.sub(replacer, content)

    return content

def clean_dist_folder():
    """
    Removes all files from the 'dist' folder.
    """
    for filename in os.listdir(dest_folder):
        file_path = os.path.join(dest_folder, filename)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(f"Failed to delete {file_path}. Reason: {e}")


if __name__ == "__main__":

    if len(sys.argv) > 1 and sys.argv[1] == "clean":
        # If 'clean' is provided as a command line argument, just clean the 'dist' folder.
        clean_dist_folder()
        print("'dist' folder cleaned.")
    else:
        # Clean the 'dist' folder before building.
        clean_dist_folder()

        if not os.path.exists(dest_folder):
            os.makedirs(dest_folder)

        for dirpath, _, filenames in os.walk(src_folder):
            for filename in filenames:
                if filename.endswith('.js'):
                    with open(os.path.join(dirpath, filename), 'r') as src_file:
                        content = src_file.read()
                        
                        # Adjust the imports and requires in the content
                        content = adjust_imports(content, dirpath)

                        new_filename = get_new_filename(os.path.join(dirpath, filename))
                        with open(os.path.join(dest_folder, new_filename), 'w') as dest_file:
                            dest_file.write(content)

        print("Flattening and import/require adjusting complete.")


