package com.bayviewglen.trees;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

import com.bayviewglen.addressbook.Contact;

public class BinarySearchTree {
	private TreeNode root;

	public BinarySearchTree() {
		super();
		root = null;
	}

	public BinarySearchTree(TreeNode root) {
		super();
		this.root = root;
	}

	public TreeNode getRoot() {
		return root;
	}

	public void setRoot(TreeNode root) {
		this.root = root;
	}

	// adds the contact whilst keeping the BST format
	public void add(TreeNode current, Contact x) {
		if (doesExists(current.getRight()) && current.getContact().compareTo(x) < 0) {
			add(current.getRight(), x);
		} else if (doesExists(current.getLeft()) && current.getContact().compareTo(x) >= 0) {
			add(current.getLeft(), x);
		} else if (!doesExists(current.getRight()) && current.getContact().compareTo(x) < 0) {
			current.setRight(new TreeNode(x));
		} else if (!doesExists(current.getLeft()) && current.getContact().compareTo(x) >= 0) {
			current.setLeft(new TreeNode(x));
		}
	}

	public void preOrderTaversal(TreeNode current) {
		evaluate(current);

		if (doesExists(current.getLeft())) {
			preOrderTaversal(current.getLeft());
		}
		if (doesExists(current.getRight())) {
			preOrderTaversal(current.getRight());
		}

	}

	public void inorderTaversal(TreeNode current) {
		if (doesExists(current.getLeft()))
			inorderTaversal(current.getLeft());

		evaluate(current);

		if (doesExists(current.getRight()))
			inorderTaversal(current.getRight());
	}

	public void postOrderTaversal(TreeNode current) {
		if (doesExists(current.getLeft()))
			postOrderTaversal(current.getLeft());

		if (doesExists(current.getRight()))
			postOrderTaversal(current.getRight());

		evaluate(current);
	}

	private void evaluate(TreeNode current) {
		System.out.println(current.getContact());
	}

	public TreeNode search(TreeNode root, Contact target) {
		if (!doesExists(root)) {
			return null;
		}
		if (target.compareTo(root.getContact()) < 0) {
			return search(root.getLeft(), target);
		} else if (target.compareTo(root.getContact()) > 0) {
			return search(root.getRight(), target);
		} else {
			return root;
		}
	}

	public TreeNode findSmallest(TreeNode root) {
		if (!doesExists(root.getLeft())) {
			return root;
		}
		return findSmallest(root.getLeft());
	}

	public TreeNode findLargest(TreeNode root) {
		if (!doesExists(root.getRight())) {
			return root;
		}
		return findLargest(root.getRight());
	}

	// same algorithm as search except this looks one ahead for target
	private TreeNode searchParent(TreeNode root, Contact target) {
		TreeNode leftNode = root.getLeft();
		TreeNode rightNode = root.getRight();
		if (!doesExists(leftNode) && !doesExists(rightNode)) {
			return null;
		}
		if ((doesExists(leftNode) && leftNode.getContact().equals(target))
				|| (doesExists(rightNode) && rightNode.getContact().equals(target))) {
			return root;
		} else if (target.compareTo(root.getContact()) < 0) {
			if (doesExists(leftNode))
				return searchParent(leftNode, target);
			else
				return null;
		} else {
			if (doesExists(rightNode))
				return searchParent(rightNode, target);
			else
				return null;
		}
	}

	private boolean doesExists(TreeNode curr) {
		return curr != null;
	}

	public boolean delete(TreeNode start, Contact target) {
		if (!doesExists(root)) {
			return false;
		}
		TreeNode parent = searchParent(start, target);
		TreeNode deleteNode;
		boolean onRight = false;
		// if parent is null; either target is root or it does not exist
		if (!doesExists(parent)) {
			if (root.getContact().equals(target)) {
				deleteNode = root;
			} else {
				return false;
			}
		} else {
			// find the node to be deleted and if it is on the left or right of the parent
			// node
			if (doesExists(parent.getLeft()) && parent.getLeft().getContact().equals(target)) {
				deleteNode = parent.getLeft();
			} else {
				onRight = true;
				deleteNode = parent.getRight();
			}
		}

		// Case 1: both children of Parent are null
		if (deleteNode.getLeft() == null && deleteNode.getRight() == null) {
			if (root == deleteNode) {
				root = null;
			} else if (parent.getContact().compareTo(target) > 0)
				parent.setLeft(null);
			else
				parent.setRight(null);
		}
		// Case 2: only right child of Parent exists
		else if (deleteNode.getLeft() == null) {
			if (root == deleteNode) {
				root = root.getRight();
			} else if (onRight)
				parent.setRight(deleteNode.getRight());
			else
				parent.setLeft(deleteNode.getRight());
		}
		// Case 3: only left child of Parent exists
		else if (deleteNode.getRight() == null) {
			if (root == deleteNode) {
				root = root.getLeft();
			} else if (onRight)
				parent.setRight(deleteNode.getLeft());
			else
				parent.setLeft(deleteNode.getLeft());
		}
		// Case 4: both children of Parent exist
		else {
			TreeNode largest = findLargest(deleteNode.getLeft());
			Contact temp = largest.getContact();
			delete(deleteNode, temp);
			deleteNode.setContact(temp);
		}
		return true;
	}

	// use preOrder traversal algorithm to preserve integrity of BST
	public void write(TreeNode curr, BufferedWriter bw) {
		if (!doesExists(curr)) {
			return;
		}
		try {
			bw.append(curr.getContact().toString() + "\n");
		} catch (IOException e) {
			e.printStackTrace();
		}
		if (doesExists(curr.getLeft())) {
			write(curr.getLeft(), bw);
		}
		if (doesExists(curr.getRight())) {
			write(curr.getRight(), bw);
		}
	}
}
