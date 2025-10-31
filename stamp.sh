NEW_BUILD_INFO="Built: $(date)"

# Use sed to find and replace the specific line within the <footer> tags
sed -i '' "s|<p id=\"build-info\">.*</p>|<p id=\"build-info\">$NEW_BUILD_INFO</p>|" index.html

