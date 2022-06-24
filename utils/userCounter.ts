class UserCounter {
  private usersCount: number;

  constructor() {
    this.usersCount = 0;
  }

  userConnected(): void {
    this.usersCount += 1;
    console.log(`User connected to the Server`);
    console.log(`Total users: ${this.usersCount}\n`);
  }

  userDisconnected(): void {
    this.usersCount -= 1;
    console.log("User disconnected from server");
    console.log(`Total users: ${this.usersCount}\n`);
  }
}

const userCounter = new UserCounter();

export default userCounter;
