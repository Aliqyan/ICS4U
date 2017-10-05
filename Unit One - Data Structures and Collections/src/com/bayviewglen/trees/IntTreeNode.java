package com.bayviewglen.trees;

public class IntTreeNode {
	private IntTreeNode left;
	private IntTreeNode right;
	private int data;
	
	public IntTreeNode() {
		super();
		left = null;
		right = null;
		data = 0;
	}
	
	public IntTreeNode(IntTreeNode left, IntTreeNode right, int data) {
		super();
		this.left = left;
		this.right = right;
		this.data = data;
	}
	
	public IntTreeNode(int data) {
		super();
		this.data = data;
		left = null;
		right = null;
	}
	
	public IntTreeNode getLeft() {
		return left;
	}
	
	public void setLeft(IntTreeNode left) {
		this.left = left;
	}
	
	public IntTreeNode getRight() {
		return right;
	}
	
	public void setRight(IntTreeNode right) {
		this.right = right;
	}
	
	public int getData() {
		return data;
	}
	
	public void setData(int data) {
		this.data = data;
	}
	/*
	public String toString() {
		return "" + data;
	}
	*/
	

}
