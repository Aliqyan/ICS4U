package com.bayviewglen.dpassignment;

public class KingKnight {
	//START END POINT : What's the best solution
	public static void main(String[] args) {
		int n = 5;
		//int knight = ;
		int king = 1;
		int[] start = {2,0};
		int[] end = {0, 3};
		int[][] moves = {{0,1},{1,1},{1,0},{1,2},{2,1}};
		

		int[] positions = new int[5+5];
		int j = 0;
		while(start[0] !=end[0] && start[1] != end[1]) {
			j++;
			if(start[0] < end[0] && start[1] < end[1]) {
				System.out.println("q1");
			}else if(start[0] > end[0] && start[1] < end[1]) {
				System.out.println("q2");
				for(int i = 0; i<moves.length; i++) {
					moves[i][0] = -moves[i][0];
				}		
			}else if(start[0] > end[0] && start[1] > end[1]) {
				System.out.println("q3");
				for(int i = 0; i<moves.length; i++) {
					moves[i][0] = -moves[i][0];
					moves[i][1] = -moves[i][1];
				}
			}else if(start[0] < end[0] && start[1] > end[1]) {
				System.out.println("q4");
				for(int i = 0; i<moves.length; i++) {
					moves[i][1] = -moves[i][1];
				}
			}
			start = bestMove(start, moves, end);
			System.out.println(start[0] + ", " + start[1]);



		}
		System.out.println(j);
		
	}
	public static int[] bestMove(int[] curr, int[][] move, int[] end) {
		int minDist = Integer.MAX_VALUE;
		int bestMove[] =  new int[2];
		
		for(int i = 0; i < move.length; i++) {
			System.out.println("wdww");
			int newX = curr[0] + move[i][0];
			int newY = curr[1] + move[i][1];
			int newDist = (int) Math.sqrt(Math.pow(newX-end[0], 2) + Math.pow(newY-end[1], 2));
			
			if(newDist < minDist) {
				System.out.println("fe");
				bestMove[0] = newX;
				bestMove[1] = newY;
				minDist = newDist;
			}

		}
		
		return bestMove;
	}

}
