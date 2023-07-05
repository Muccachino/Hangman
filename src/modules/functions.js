"use strict";

//create Tags
function createTag(parent_node, tag_node, id_name, class_name, content) {
  const tag = document.createElement(tag_node);

  if (parent_node != null) {
    parent_node.append(tag);
  } else {
    const startpoint = document.getElementById("content");
    startpoint.append(tag);
  }

  if (id_name != null) {
    tag.id = id_name;
  }

  if (class_name != null) {
    tag.className = class_name;
  }

  if (content != null) {
    tag.innerHTML = content;
  }

  return tag;
}

//create multiple tags
function createMultiTags(parent_node, tag_node, num, className, contentList) {
  for (let i = 0; i < num; i++) {
    createTag(parent_node, tag_node, null, className, contentList[i]);
  }
}

export { createTag, createMultiTags };
