package com.bayviewglen.linkedlists;

public class LinkedList {
	private IntNode tail;
	private IntNode head;
	private int numNodes;

	public LinkedList() {
		head = null;
		tail = null;
		numNodes = 0;
	}

	// Inserts the specified element at the specified position in this list.
	public void add(int index, int data) {
		if (index > numNodes || index < 0) {
			throw new IndexOutOfBoundsException("Index: " + index + ", Size :" + numNodes);
		}
		if (numNodes == 0) {
			head = new IntNode(data, null);
			tail = head;
		} else if (index == 0) {
			head = new IntNode(data, head);
		} else if (index < numNodes && index < numNodes) {
			IntNode posNode = head;
			for (int i = 0; i < index - 1; i++) {
				posNode = posNode.getLink();
			}
			IntNode temp = new IntNode(data, posNode.getLink());
			posNode.setLink(temp);
		} else {
			IntNode temp = new IntNode(data, null);
			tail.setLink(temp);
			tail = temp;
		}
		numNodes++;
	}

	// Appends the specified element to the end of this list.
	public boolean add(int data) {
		add(numNodes, data);
		return true;
	}

	// Inserts the specified element at the beginning of this list.
	public boolean addFirst(int data) {
		add(0, data);
		return true;
	}

	// Removes all of the elements from this list.
	public void clear() {
		head = null;
		tail = null;
		numNodes = 0;
	}

	// Returns the element at the specified position in this list.
	public int get(int index) {
		if (index > numNodes || numNodes == 0 || index < 0) {
			throw new IndexOutOfBoundsException("Index: " + index + ", Size :" + numNodes);
		}
		IntNode posNode;
		if (numNodes == index) {
			posNode = tail;
		} else {
			posNode = head;
			for (int i = 0; i < index; i++) {
				posNode = posNode.getLink();
			}
		}
		return posNode.getData();
	}

	// Returns the first element in this list.
	public int getFirst() {
		return get(0);
	}

	// Returns the last element in this list.
	public int getLast() {
		return get(numNodes);
	}

	// Returns an array containing all of the elements in this list in proper
	// sequence (from first to last element).
	public int[] toArray() {
		int[] arr = new int[numNodes];
		IntNode curr = head;
		for (int i = 0; i < numNodes; i++) {
			arr[i] = curr.getData();
			curr = curr.getLink();
		}
		return arr;
	}

	// Removes the element at the specified position in this list.
	public int remove(int index) {
		if (index >= numNodes || numNodes == 0 || index < 0) {
			throw new IndexOutOfBoundsException("Index: " + index + ", Size :" + numNodes);
		}
		int data = 0;
		if (index == 0) {
			data = head.getData();
			head = head.getLink();
			numNodes--;
		} else {
			IntNode prevNode = head;
			for (int i = 0; i < index - 1; i++) {
				prevNode = prevNode.getLink();
			}
			IntNode currNode = prevNode.getLink();
			data = currNode.getData();
			if (index + 1 == numNodes) {
				prevNode.setLink(null);
				tail = prevNode;
			} else {
				prevNode.setLink(currNode.getLink());
			}

			numNodes--;
		}
		return data;
	}

	// Removes and returns the first element from this list.
	public int removeFirst() {
		return remove(0);
	}

	// Retrieves and removes the head (first element) of this list.
	public int remove() {
		return remove(0);
	}

	// Removes and returns the last element from this list.
	public int removeLast() {
		return remove(numNodes - 1);
	}

	// Replaces the element at the specified position in this list with the
	// specified element
	public int set(int index, int data) {
		if (index >= numNodes || numNodes == 0 || index < 0) {
			throw new IndexOutOfBoundsException("Index: " + index + ", Size :" + numNodes);
		}
		IntNode posNode;
		int retData;
		posNode = head;
		for (int i = 0; i < index; i++) {
			posNode = posNode.getLink();
		}
		retData = posNode.getData();
		posNode.setData(data);

		return retData;
	}

	// Returns the number of elements in this list.
	public int size() {
		return numNodes;
	}

	// Returns true if this list contains the specified element.
	public boolean contains(int element) {
		IntNode posNode = head;
		for (int i = 0; i < numNodes; i++) {
			if (posNode.getData() == element) {
				return true;
			}
			posNode = posNode.getLink();
		}
		return false;

	}

	// Removes the first occurrence of the specified element in this list (when
	// traversing the list from head to tail).
	public boolean removeFirstOccurrence(int element) {
		IntNode posNode = head;
		for (int i = 0; i < numNodes; i++) {
			if (posNode.getData() == element) {
				remove(i);
				return true;
			}
			posNode = posNode.getLink();
		}
		return false;

	}

	// Removes the last occurrence of the specified element in this list (when
	// traversing the list from head to tail).
	public boolean removeLastOccurrence(int element) {
		IntNode posNode = head;
		int curr = 0;
		for (int i = 0; i < numNodes; i++) {
			if (posNode.getData() == element) {
				curr = i;
			}
			posNode = posNode.getLink();
		}
		if (curr < 0) {
			return false;
		} else {
			remove(curr);
			return true;
		}

	}

}
