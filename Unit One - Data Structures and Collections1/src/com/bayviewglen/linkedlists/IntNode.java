package com.bayviewglen.linkedlists;

public class IntNode {
	int data;
	IntNode link;
	public IntNode(int data, IntNode link) {
		this.data = data;
		this.link = link;
	}
	
	public IntNode() {
		data = 0;
		link = null;
	}

	public int getData() {
		return data;
	}

	public void setData(int data) {
		this.data = data;
	}

	public IntNode getLink() {
		return link;
	}

	public void setLink(IntNode link) {
		this.link = link;
	}
	
	
}
