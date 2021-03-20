describe('TicTacToe Integration Test', () => {
  beforeEach(() => {
    // 初期画面をロードする
    cy.visit('/');
    // 初期Squareが全て空文字であること
    cy.get('[data-e2e=square]').each(($el) => {
      expect($el).to.contain('');
    });
    // 初期StatusにプレイヤーXが表示されていること
    cy.get('[data-e2e=status]').should('have.text', 'Next Player: X');
    // 初期Moveの配列長が1であること
    cy.get('[data-e2e=move]').should('have.length', 1);
  });

  it('プレイヤーXが5手目で勝利する', () => {
    /**
     * 以下の状態でプレイヤーXが勝利する
     *
     * X(3) _    _
     * O(4) X(1) _
     * O(2) _    X(5)
     */

    // 1手目
    cy.get('[data-e2e=square]').eq(4).click().should('have.text', 'X');
    cy.get('[data-e2e=status]').should('have.text', 'Next Player: O');
    cy.get('[data-e2e=move]').eq(1).should('have.text', 'Go to move #1');
    // 2手目
    cy.get('[data-e2e=square]').eq(6).click().should('have.text', 'O');
    cy.get('[data-e2e=status]').should('have.text', 'Next Player: X');
    cy.get('[data-e2e=move]').eq(2).should('have.text', 'Go to move #2');
    // 3手目
    cy.get('[data-e2e=square]').eq(0).click().should('have.text', 'X');
    cy.get('[data-e2e=status]').should('have.text', 'Next Player: O');
    cy.get('[data-e2e=move]').eq(3).should('have.text', 'Go to move #3');
    // 4手目
    cy.get('[data-e2e=square]').eq(3).click().should('have.text', 'O');
    cy.get('[data-e2e=status]').should('have.text', 'Next Player: X');
    cy.get('[data-e2e=move]').eq(4).should('have.text', 'Go to move #4');
    // 5手目
    cy.get('[data-e2e=square]').eq(8).click().should('have.text', 'X');
    cy.get('[data-e2e=status]').should('have.text', 'Winner: X');
    cy.get('[data-e2e=move]').eq(5).should('have.text', 'Go to move #5');
  });
});
