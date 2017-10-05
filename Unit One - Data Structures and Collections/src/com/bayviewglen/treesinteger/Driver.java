package com.bayviewglen.treesinteger;

public class Driver {
	static BinarySearchTree bst = new BinarySearchTree();

	public static void main(String[] args) {
		bst.add(23);
		bst.add(18);
		bst.add(20);
		bst.add(12);
		bst.add(44);
		bst.add(35);
		bst.add(52);

		display();
		System.out.println(bst.delete(bst.getRoot(), 23));
		display();

		

		/*
		bst.inorderTaversal(bst.getRoot());
		System.out.println();
		bst.preOrderTaversal(bst.getRoot());
		System.out.println();
		bst.postOrderTaversal(bst.getRoot());
		System.out.println();
		
		System.out.println(bst.delete(bst.getRoot(), 12));
		System.out.println(bst.delete(bst.getRoot(), 12));

		bst.inorderTaversal(bst.getRoot());
		
		*/
		/*bst.inorderTaversal(bst.getRoot());

		System.out.println(bst.search(bst.getRoot(), 12));
		System.out.println(bst.delete(bst.getRoot(), 12));
		//bst.postOrderTaversal(bst.getRoot());

		bst.inorderTaversal(bst.getRoot());
		*/
		
		



	}
	public static void display() {
		System.out.println("");
		System.out.println("********************************************************************************************************************************************************************************");
		System.out.println("********************************************************************************************************************************************************************************");
		System.out.print("PreOrder: ");
		bst.preOrderTaversal(bst.getRoot());
		System.out.println();
		System.out.print("InOrder: ");
		bst.inorderTaversal(bst.getRoot());
		System.out.println();
		System.out.print("PostOrder: ");
		bst.postOrderTaversal(bst.getRoot());
		System.out.println();
		System.out.println("********************************************************************************************************************************************************************************");
		System.out.println("********************************************************************************************************************************************************************************");
		System.out.println("");
	}

}
