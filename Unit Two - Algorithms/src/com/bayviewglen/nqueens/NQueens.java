package com.bayviewglen.nqueens;

import java.awt.Point;
import java.util.Scanner;
import java.util.Stack;

public class NQueens {
	static int n;
	static Stack<Point> points;
	static int filled;

	public static void main(String[] args) {
		points = new Stack<Point>();
		Scanner keyboard = new Scanner(System.in);
		System.out.print("How many queens do you want: ");
		n = keyboard.nextInt();
		filled = 0;
		
		System.out.println("----------------------------------------------------");
		System.out.println("----------------------------------------------------");
		System.out.println();
		
		long start = System.currentTimeMillis();
		boolean works = addQueens();
		if (works) {
			displayBoard();
		} else {
			System.out.println("No valid Solution");
		}
		System.out.printf("This took: %.4f" ,(System.currentTimeMillis() - start)/1000.0);

	}

	public static boolean addQueens() {
		int count = 0;
		int a = 0;
		boolean overRide = false;
		while (filled < n) {
			// System.out.println(count++ + ", " + filled);

			int x;
			if (overRide) {
				x = a;
				overRide = false;
			} else {
				x = 0;
			}

			// get point which is has no conflict
			Point curr = new Point(x, filled);
			while (conflict(curr) && x <= n) {
				curr = new Point(++x, filled);
			}

			// no soln possible
			if (filled == 0 && x >= n) {
				return false;
			}
			// Back Track
			else if (x >= n) {
				filled--;
				a = (int) points.pop().getX() + 1;
				overRide = true;
			}
			// Add point to stack
			else {
				points.push(curr);
				filled++;
			}
		}
		return true;

	}

	// true if conflict
	public static boolean conflict(Point curr) {
		Stack<Point> temp = new Stack<Point>();
		temp.addAll(points);

		while (!temp.empty()) {
			Point next = temp.pop();
			int xDist = (int) Math.abs(curr.getX() - next.getX());
			int yDist = (int) Math.abs(curr.getY() - next.getY());
			if (xDist == 0 || yDist == 0 || xDist == yDist) {
				return true;
			}
		}

		return false;
	}

	// for debugging only
	public static void display() {
		Stack<Point> temp = new Stack<Point>();
		temp.addAll(points);
		while (!temp.empty()) {
			System.out.println("---> " + temp.peek().getX() + ", " + temp.pop().getY());
		}
	}

	public static void displayBoard() {
		Stack<Point> temp = new Stack<Point>();
		temp.addAll(points);
		for (int i = n; i > 0; i--) {
			// Assuming num queens is equal to ch
			Point curr = temp.pop();
			for (int j = 0; j < n; j++) {
				if (j == curr.getX()) {
					System.out.print("Q ");
				} else {
					System.out.print("- ");
				}
			}
			System.out.println();
		}
	}

}
