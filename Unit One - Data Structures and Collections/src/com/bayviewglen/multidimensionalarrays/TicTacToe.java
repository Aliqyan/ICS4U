package com.bayviewglen.multidimensionalarrays;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class TicTacToe {
	static char[][] grid;

	public static void main(String[] args) {
		grid = new char[3][3];
		read();
		if (checkValid()) {
			char value = check();
			if (value == 'T') {
				System.out.println("TIE");
			} else {
				System.out.println(value + " Won");

			}
		}
	}

	private static boolean checkValid() {
		int x = 0, o = 0;
		for (int i = 0; i < 3; i++) {
			for (int j = 0; j < 3; j++) {
				if (grid[i][j] == 'X') {
					x++;
				} else if (grid[i][j] == 'O') {
					o++;
				}
			}
		}
		if (Math.abs(x - o) > 1) {
			System.out.println("Not a Valid Game!");
			return false;
		}
		return true;
	}

	private static char check() {
		for (int i = 0; i < 3; i++) {
			if (grid[i][0] == grid[i][1] && grid[i][2] == grid[i][0]) {
				return grid[i][0];
			} else if (grid[0][i] == grid[1][i] && grid[0][i] == grid[2][i]) {
				return grid[0][i];
			}
		}
		if ((grid[0][0] == grid[1][1] && grid[0][0] == grid[2][2])
				|| (grid[0][2] == grid[1][1] && grid[2][0] == grid[0][2]))
			return grid[1][1];

		return 'T';

	}

	public static void read() {
		try {
			Scanner input = new Scanner(new File("data/TicTacToe.dat"));
			for (int i = 0; i < 3; i++) {
				grid[i] = input.nextLine().toCharArray();
			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
