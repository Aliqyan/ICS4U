package com.bayviewglen.treesinteger;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.util.LinkedList;
import java.util.Queue;

public class BinarySearchTree {
	private IntTreeNode root;

	public BinarySearchTree(IntTreeNode root) {
		super();
		this.root = root;
	}

	public BinarySearchTree() {
		super();
		root = null;
	}

	public void add(IntTreeNode current, int x) {
		System.out.println(current.getData());

		if (current.getRight() != null && current.getData() < x) {
			add(current.getRight(), x);
		} else if (current.getLeft() != null && current.getData() >= x) {
			add(current.getLeft(), x);
		} else if (current.getRight() == null && current.getData() < x) {
			current.setRight(new IntTreeNode(x));
		} else if (current.getLeft() == null && current.getData() >= x) {
			current.setLeft(new IntTreeNode(x));
		}
	}

	public void add(int x) {
		if (root == null) {
			IntTreeNode temp = new IntTreeNode(x);
			root = temp;
		} else {
			add(root, x);
		}
	}

	public void inorderTaversal(IntTreeNode current) {

		if (current.getLeft() != null)
			inorderTaversal(current.getLeft());
		evaluate(current);

		if (current.getRight() != null)
			inorderTaversal(current.getRight());
	}

	public void preOrderTaversal(IntTreeNode current) {
		evaluate(current);

		if (current.getLeft() != null) {
			preOrderTaversal(current.getLeft());
		}
		if (current.getRight() != null) {
			preOrderTaversal(current.getRight());
		}

	}

	public void postOrderTaversal(IntTreeNode current) {
		if (current.getLeft() != null)
			postOrderTaversal(current.getLeft());

		if (current.getRight() != null)
			postOrderTaversal(current.getRight());

		evaluate(current);
	}

	public IntTreeNode getRoot() {
		return root;
	}

	public void setRoot(IntTreeNode root) {
		this.root = root;
	}

	private void evaluate(IntTreeNode current) {
		System.out.print(current.getData() + ", ");
	}

	public IntTreeNode findSmallest(IntTreeNode root) {
		if (root.getLeft() == null) {
			return root;
		}
		return findSmallest(root.getLeft());
	}

	public IntTreeNode findLargest(IntTreeNode root) {
		if (root.getRight() == null) {
			return root;
		}

		return findSmallest(root.getRight());
	}

	public IntTreeNode search(IntTreeNode root, int target) {
		if (root == null) {
			return null;
		}
		if (target < root.getData()) {
			return search(root.getLeft(), target);
		} else if (target > root.getData()) {
			return search(root.getRight(), target);
		} else {
			return root;
		}
	}

	private IntTreeNode searchParent(IntTreeNode root, int target) {
		IntTreeNode leftNode = root.getLeft();
		IntTreeNode rightNode = root.getRight();
		if (leftNode == null && rightNode == null) {
			return null;
		} else if ((leftNode != null && leftNode.getData() == target)
				|| (rightNode != null && rightNode.getData() == target)) {
			return root;
		} else if (target < root.getData()) {
			return searchParent(leftNode, target);
		} else {
			return searchParent(rightNode, target);
		}
	}

	public boolean delete(IntTreeNode root, int target) {
		IntTreeNode parent = searchParent(root, target);
		IntTreeNode deleteNode;
		boolean right = false;
		if (parent == null) {
			if (root.getData() == target) {
				deleteNode = root;
			} else {
				return false;
			}
		} else {
			if (parent.getData() > target) {
				deleteNode = parent.getLeft();
			} else {
				right = true;
				deleteNode = parent.getRight();
			}
		}
		
		if (deleteNode.getLeft() == null && deleteNode.getRight() == null) {
			if (parent.getData() > target)
				parent.setLeft(null);
			else
				parent.setRight(null);
		} else if (deleteNode.getLeft() == null) {
			if (right)
				parent.setRight(deleteNode.getLeft());
			else
				parent.setLeft(deleteNode.getLeft());
		} else if (deleteNode.getRight() == null) {
			if (right)
				parent.setRight(deleteNode.getRight());
			else
				parent.setLeft(deleteNode.getRight());
		} else {
			IntTreeNode largest = findLargest(deleteNode.getLeft());
			int data = largest.getData();
			delete(deleteNode, data);
			deleteNode.setData(data);
		}
		return true;
	}

}
