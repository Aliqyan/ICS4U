package com.bayviewglen.trees;
import com.bayviewglen.addressbook.Contact;

public class BinarySearchTree {
	private TreeNode root;

	public BinarySearchTree(TreeNode root) {
		super();
		this.root = root;
	}

	public BinarySearchTree() {
		super();
		root = null;
	}

	public void add(TreeNode current, Contact x) {
		System.out.println(current.getContact());
		if (current.getRight() != null && current.getContact().compareTo(x) < 0) {
			System.out.println("-------> a: " + current.getContact() + " --> " + x);
			add(current.getRight(), x);
		} else if (current.getLeft() != null && current.getContact().compareTo(x) >= 0) {
			System.out.println("-------> b: " + current.getContact() + " --> " + x);
			add(current.getLeft(), x);
		} else if (current.getRight() == null && current.getContact().compareTo(x) < 0) {
			System.out.println("-------> c: " + current.getContact() + " --> " + x);
			current.setRight(new TreeNode(x));
		} else if (current.getLeft() == null && current.getContact().compareTo(x) >= 0) {
			System.out.println("-------> d: " + current.getContact() + " --> " + x);
			current.setLeft(new TreeNode(x));
		}
	}

	public void add(Contact x) {
		System.out.println("a");
		if (root == null) {
			TreeNode temp = new TreeNode(x);
			root = temp;
			System.out.println("b");
		} else {
			System.out.println("c");

			add(root, x);
		}
	}

	public void inorderTaversal(TreeNode current) {

		if (current.getLeft() != null)
			inorderTaversal(current.getLeft());
		evaluate(current);

		if (current.getRight() != null)
			inorderTaversal(current.getRight());
	}

	public void preOrderTaversal(TreeNode current) {
		evaluate(current);

		if (current.getLeft() != null) {
			preOrderTaversal(current.getLeft());
		}
		if (current.getRight() != null) {
			preOrderTaversal(current.getRight());
		}

	}

	public void postOrderTaversal(TreeNode current) {
		if (current.getLeft() != null)
			postOrderTaversal(current.getLeft());

		if (current.getRight() != null)
			postOrderTaversal(current.getRight());

		evaluate(current);
	}

	public TreeNode getRoot() {
		return root;
	}

	public void setRoot(TreeNode root) {
		this.root = root;
	}

	private void evaluate(TreeNode current) {
		System.out.println(current.getContact() + ", ");
	}

	public TreeNode findSmallest(TreeNode root) {
		if (root.getLeft() == null) {
			return root;
		}
		return findSmallest(root.getLeft());
	}

	public TreeNode findLargest(TreeNode root) {
		if (root.getRight() == null) {
			return root;
		}

		return findSmallest(root.getRight());
	}

	public TreeNode search(TreeNode root, Contact target) {
		if (root == null) {
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

	private TreeNode searchParent(TreeNode root, Contact target) {
		System.out.println(root.getContact());
		TreeNode leftNode = root.getLeft();
		TreeNode rightNode = root.getRight();
		if (leftNode == null && rightNode == null) {
			return null;
		} else if ((leftNode != null && leftNode.getContact().equals(target))
				|| (rightNode != null && rightNode.getContact().equals(target))) {
			return root;
		} else if (target.compareTo(root.getContact()) < 0) {
			return searchParent(leftNode, target);
		} else {
			return searchParent(rightNode, target);
		}
	}

	public boolean delete(TreeNode root, Contact target) {
		TreeNode parent = searchParent(root, target);
		TreeNode deleteNode;
		boolean right = false;
		if (parent == null) {
			if (root.getContact().equals(target)) {
				deleteNode = root;
			} else {
				return false;
			}
		} else {
			if (parent.getContact().compareTo(target) > 0) {
				deleteNode = parent.getLeft();
			} else {
				right = true;
				deleteNode = parent.getRight();
			}
		}
		
		if (deleteNode.getLeft() == null && deleteNode.getRight() == null) {
			System.out.println("Case 1");
			if (parent.getContact().compareTo(target) > 0)
				parent.setLeft(null);
			else
				parent.setRight(null);
		} else if (deleteNode.getLeft() == null) {
			System.out.println("Case 2");
			if (right)
				parent.setRight(deleteNode.getLeft());
			else
				parent.setLeft(deleteNode.getLeft());
		} else if (deleteNode.getRight() == null) {
			System.out.println("Case 3");
			if (right)
				parent.setRight(deleteNode.getRight());
			else
				parent.setLeft(deleteNode.getRight());
		} else {
			System.out.println("Case 4");
			TreeNode largest = findLargest(deleteNode.getLeft());
			Contact temp = largest.getContact();
			delete(deleteNode, temp);
			deleteNode.setContact(temp);
		}
		return true;
	}

}
