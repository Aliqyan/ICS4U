package com.bayviewglen.multidimensionalarrays;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Scanner;

public class Sodoku {
	static int[][] grid;

	public static void main(String[] args) {
		grid = new int[9][9];
		// grid is the same as row
		int[][] col = new int[9][9];
		int[][] box = new int[9][9];

		read();

		for (int i = 0; i < 9; i++) {
			for (int j = 0; j < 9; j++) {
				box[3 * (i / 3) + j / 3][3 * (i % 3) + j % 3] = grid[i][j];
				col[j][i] = grid[i][j];

			}
		}
		if (check(box) && check(grid) && check(col))
			System.out.println("Everything is awesome");
		else
			System.out.println("Everything is not awesome");
	}

	private static boolean check(int[][] arr) {
		for (int[] temp : arr) {
			Arrays.sort(temp);
			for (int i = 0; i < 9; i++) {
				if (temp[i] != i + 1) {
					return false;
				}

			}
		}
		return true;
	}

	public static void read() {
		try {
			Scanner input = new Scanner(new File("data/Sodoku.dat"));
			for (int i = 0; i < 9; i++) {
				String temp = input.nextLine();
				for (int j = 0; j < 9; j++) {
					grid[i][j] = Integer.parseInt(temp.substring(j, j + 1));
				}

			}
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
