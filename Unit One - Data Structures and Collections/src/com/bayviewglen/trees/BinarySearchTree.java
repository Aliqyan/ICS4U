package com.bayviewglen.trees;
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

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

	public void add(Contact x) {
		if (root == null) {
			TreeNode temp = new TreeNode(x);
			root = temp;
		} else {
			add(root, x);
		}
	}

	public void inorderTaversal(TreeNode current) {

		if (doesExists(current.getLeft()))
			inorderTaversal(current.getLeft());
		evaluate(current);

		if (doesExists(current.getRight()))
			inorderTaversal(current.getRight());
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

	public void postOrderTaversal(TreeNode current) {
		if (doesExists(current.getLeft()))
			postOrderTaversal(current.getLeft());

		if (doesExists(current.getRight()))
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
		System.out.println(current.getContact());
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

		return findSmallest(root.getRight());
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
			if(doesExists(leftNode))
				return searchParent(leftNode, target);
			else return null;
		} else {
			if(doesExists(rightNode))
				return searchParent(rightNode, target);
			else return null;
		}
	}
	
	private boolean doesExists(TreeNode curr) {
		return curr != null;
	}

	public boolean delete(TreeNode root, Contact target) {
		TreeNode parent = searchParent(root, target);
		TreeNode deleteNode;
		boolean right = false;
		if (!doesExists(parent)) {
			if (root.getContact().equals(target)) {
				deleteNode = root;
			} else {
				return false;
			}
		} else {
			if (doesExists(parent.getLeft()) && parent.getLeft().getContact().equals(target)) {
				deleteNode = parent.getLeft();
			} else {
				right = true;
				deleteNode = parent.getRight();
			}
		}
		
		if (deleteNode.getLeft() == null && deleteNode.getRight() == null) {
			if (parent.getContact().compareTo(target) > 0)
				parent.setLeft(null);
			else
				parent.setRight(null);
		} else if (deleteNode.getLeft() == null) {
			if (right)
				parent.setRight(deleteNode.getRight());
			else
				parent.setLeft(deleteNode.getRight());
		} else if (deleteNode.getRight() == null) {
			if (right)
				parent.setRight(deleteNode.getLeft());
			else
				parent.setLeft(deleteNode.getLeft());
		} else {
			TreeNode largest = findLargest(deleteNode.getLeft());
			Contact temp = largest.getContact();
			delete(deleteNode, temp);
			deleteNode.setContact(temp);
		}
		return true;
	}
	
	public ArrayList<Contact> toArray() {
	    ArrayList<Contact> result = new ArrayList<Contact>();
	    toArrayHelp(root, result);
	    return result;
	}

	private void toArrayHelp(TreeNode curr, ArrayList<Contact> result) {
	    if (curr == null) {
	        return;
	    }
	    result.add(curr.getContact()); 
	    toArrayHelp(curr.getLeft(), result); 
	    toArrayHelp(curr.getRight(), result); 
	}

	public void write(TreeNode curr, BufferedWriter bw)  {
		if(!doesExists(curr)) {
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
