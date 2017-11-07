package com.bayviewglen.dpassignment;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

/*This is the Rossos Flair version
 * DO NOT MARK
 * NO DP IN HERE
 * 
 * */

public class KingKnight {
	// START END POINT : What's the best solution
	public static void main(String[] args) {
		long t = System.currentTimeMillis();
		read();
		System.out.println("Time: " + (System.currentTimeMillis()-t));
	}

	public static void read() {
		try {
			Scanner in = new Scanner(new File("data/KingKnight.dat"));
			int t = in.nextInt();
			for (int i = 0; i < t; i++) {
				int n = in.nextInt();
				int[] start = new int[2];
				int[] end = new int[2];
				start[0] = in.nextInt();
				start[1] = in.nextInt();
				end[0] = in.nextInt();
				end[1] = in.nextInt();

				solve(n, start, end);

			}

			in.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}

	}

	public static void solve(int n, int[] start, int[] end) {
		// int n = 5;
		// int knight = ;
		int king = 1;
		// int[] start = {2,0};
		// int[] end = {0, 3};
		// int[][] movesQ1 = {{0,1},{1,1},{1,0},{1,2},{2,1}};

		int[][] moves = { { 0, 1 }, { 1, 1 }, { 1, 0 }, { 1, -1 }, { 0, -1 }, { -1, -1 }, { -1, 0 }, { -1, 1 },
				{ 1, 2 }, { 2, 1 }, { 1, -2 }, { 2, -1 }, { -1, -2 }, { -2, -1 }, { -2, 1 }, { -1, 2 } };

		int j = 0;
		// System.out.println(start[0] + ", " + start[1]);
		// System.out.println(end[0] + ", " + end[1]);

		while (start[0] != end[0] || start[1] != end[1]) {
			start = bestMove(n, start, moves, end);
			j++;
		}
		System.out.println(j);

	}

	public static int[] bestMove(int n, int[] curr, int[][] move, int[] end) {

		double minDist = Integer.MAX_VALUE;
		int bestMove[] = new int[2];

		for (int i = 0; i < move.length; i++) {
			int newX = curr[0] + move[i][0];
			int newY = curr[1] + move[i][1];
			double newDist = Math.sqrt(Math.pow(newX - end[0], 2) + Math.pow(newY - end[1], 2));

			if (newDist < minDist && newX <= n && newY <= n) {
				bestMove[0] = newX;
				bestMove[1] = newY;
				minDist = newDist;
			}

		}
		return bestMove;
	}

}
