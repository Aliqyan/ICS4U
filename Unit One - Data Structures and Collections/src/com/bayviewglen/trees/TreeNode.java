package com.bayviewglen.trees;

import com.bayviewglen.addressbook.Contact;

public class TreeNode implements Comparable<TreeNode> {
	private TreeNode left;
	private TreeNode right;
	private Contact contact;

	public TreeNode() {
		super();
		left = null;
		right = null;
		contact = null;
	}

	public TreeNode(TreeNode left, TreeNode right, Contact contact) {
		super();
		this.left = left;
		this.right = right;
		this.contact = contact;
	}

	public TreeNode(Contact contact) {
		super();
		this.contact = contact;
		left = null;
		right = null;
	}

	public TreeNode getLeft() {
		return left;
	}

	public void setLeft(TreeNode left) {
		this.left = left;
	}

	public TreeNode getRight() {
		return right;
	}

	public void setRight(TreeNode right) {
		this.right = right;
	}

	public Contact getContact() {
		return contact;
	}

	public void setContact(Contact contact) {
		this.contact = contact;
	}

	@Override
	public int compareTo(TreeNode other) {
		return (contact.compareTo(other.getContact()));
	}

	public boolean equals(TreeNode other) {
		return (contact.equals(other.getContact()));
	}

}
